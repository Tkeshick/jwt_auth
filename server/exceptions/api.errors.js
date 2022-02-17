module.exports = class ApiError extends Error {
  // обработка ошибок
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message)
    this.errors = errors;
    this.status = status;
  }

  static UnaurhorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  // при некорректных данных
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors)
  }
}
