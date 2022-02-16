class UserController {
  async register(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }


  async login(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }


  async logout(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async activate(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async refresh(req, res, next) {
    try {

    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(['Hello'])
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController()
