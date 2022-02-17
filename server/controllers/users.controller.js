const userService = require("../service/user.service");
const ApiError = require('../exceptions/api.errors.js')

class UserController {
  async register(req, res, next) {
    try {
      // получаем данные из тела
      const { email, password } = req.body
      // передаем в функции регистрации внутри сервиса
      const userData = await userService.register(email, password)
      // рефреш куку храним в куках на 30 дней из token.service 
      // 1ым парам - ключ , 2ым - сам токен
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }


  async login(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }


  async logout(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  async activate(req, res, next) {
    try {
      // из строки запроса получаем ссылку активации
      const activateLink = req.params.link
      // обращаемся к юзеру сервису и передаем туда ссылку
      await userService.activate(activateLink)
      return res.redirect(process.env.CLIENT_URL)
    } catch (error) {
      next(error)
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['Hello'])
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
