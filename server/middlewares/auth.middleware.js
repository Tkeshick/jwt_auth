const ApiError = require("../exceptions/api.errors")
const tokenService = require('../service/token.service.js')

module.exports = function (req, res, next) {
  try {
    // в заголовке запроса указывваем Authorization: bearer access_token
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      return next(ApiError.UnaurhorizedError())
    }
    // достаем access_token как второй параметр по пробелу
    const [tokenType, accessToken] = authorizationHeader.split(' ');
    if (!accessToken) {
      return next(ApiError.UnaurhorizedError())
    }

    // функция валдиции токена 
    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      return next(ApiError.UnaurhorizedError())
    }
    req.user = userData;
    next()
  } catch (error) {
    return next(ApiError.UnaurhorizedError())
  }
}
