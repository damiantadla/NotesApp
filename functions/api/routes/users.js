const express = require('express')

const AuthMiddleware = require('../middleware/authMiddleware')
const getUserController = require('../controllers/user/getData')

const router = express.Router()

router.get(
    '/getUserData',
    AuthMiddleware.auth,
    getUserController.getUserData
)


module.exports = router