const ApiError = require("../exceptions/api.errors")

module.exports = function (req, res, next) {
  try {

  } catch (error) {
    return next(ApiError.UnaurhorizedError())
  }
}
