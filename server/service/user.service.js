const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service.js')

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




  }
}

module.exports = new UserService()
