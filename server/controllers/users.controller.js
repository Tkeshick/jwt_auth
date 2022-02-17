const userService = require("../service/user.service");
const ApiError = require('../exceptions/api.errors.js')
const { validationResult } = require('express-validator')

class UserController {
  async register(req, res, next) {
    try {
      // для валидации реквеста
      const errors = validationResult(req)
      // // делаем проверку массива ошибок
      if (!errors.isEmpty()) {
        // передается в error handler
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
      }


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
      // вытасикиваем данные из тела запроса
      const { email, password } = req.body
      // вытваем из юзер сервиса и передадим майл и апроль
      const userData = await userService.login(email, password)
      // установим рефреш куки
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }


  async logout(req, res, next) {
    try {
      // вытаскиваем рефреш токе
      const { refreshToken } = req.cookies
      // передаем в сервис рефрешнутый токен
      const token = await userService.logout(refreshToken)
      // в ответе удаляем куку
      res.clearCookie('refreshToken')
      return res.json(token)

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
      // доастаем из кук токен
      const { refreshToken } = req.cookies
      const userData = await userService.refresh(refreshToken)
      // установим рефреш куки
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 30, httpOnly: true })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async getUsers(req, res, next) {
    try {
      const allUsers = await userService.getAllUsers()
      res.json(allUsers)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new UserController()
