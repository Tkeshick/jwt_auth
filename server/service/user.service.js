const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service.js')
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')

class UserService {
  async register(email, password) {
    // проверяем наличие юзера
    const candidate = await User.findOne({
      where: {
        email,
      },
    })
    //  наличие юзера - ошибка
    if (candidate) {
      throw new Error(`Пользователь с ${email} почтой уже существует`)
    }
    // хэшируем пароль
    const salt = 3;
    const hashPass = await bcrypt.hash(password, salt)
    // делаем ссылку для активации аккаунта
    const activationLink = uuid.v4()
    //сохраняем в базу юзера
    const newUser = await User.create({
      email,
      password: hashPass,
    })
    // отправляем юзеру на почту письмо с активацией
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    // формируем  data transfer object 
    const userDto = new UserDto(newUser)

    // генерируем токены
    const tokens = tokenService.generateTokens({ ...userDto })
    // сохраняем рефреш токены в бд
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }
}

module.exports = new UserService()
