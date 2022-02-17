const jwt = require('jsonwebtoken')
const { Token } = require('../db/models')

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' })

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' })

    return {
      accessToken,
      refreshToken
    }
  }

  // валидация токенов
  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({
      where: {
        userId,
      },
    })

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save()
    }

    const token = await Token.create({
      userId,
      refreshToken
    })
    return token
  }

  async removeToken(refreshToken) {
    // удаляем из БД
    const deletedToken = await Token.destroy({
      where: {
        refreshToken
      }
    })
    return deletedToken
  }

  // проверка токена в бд
  async findToken(refreshToken) {
    const foundToken = await Token.findOne({
      where: {
        refreshToken
      }
    })
    return foundToken
  }
}

module.exports = new TokenService()
