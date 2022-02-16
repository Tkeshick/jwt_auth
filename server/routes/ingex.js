const Router = require('express').Router
const userConroller = require('../controllers/users.controller.js')
const router = new Router()

router.post('/register', userConroller.register)
router.post('/login', userConroller.login)
router.post('/logout', userConroller.logout)
// активация аккаунта по ссылке
router.get('/activate/:link', userConroller.activate)
// перезаписывать фксесс токен когда токен помрет
router.get('/refresh', userConroller.refresh)

router.get('/users', userConroller.getUsers)

module.exports = router;

