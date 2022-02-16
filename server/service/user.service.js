const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service.js')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')

class UserService {
  async register(email, password) {
    const candidate = await User.findOne({
      where: {
        email,
      }
    })

    if (candidate) {
      throw new Error(`Пользователь с ${email} почтой уже существует`)
    }
    const salt = 3;
    const hashPass = await bcrypt.hash(password, salt)
    const activationLink = uuid.v4()

    const newUser = await User.create({
      email,
      password: hashPass,
    })

    await mailService.sendActivationMail(email, activationLink)

    const userDto = new UserDto(newUser)
    const tokens = tokenService.generateTokens({ ...userDto })

    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
}

module.exports = new UserService()
