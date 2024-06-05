const express = require('express')

const AuthMiddleware = require('../middleware/authMiddleware')
const getUserController = require('../controllers/user/getData')

const router = express.Router()

router.get(
    '/',
    AuthMiddleware.auth,
    getUserController.getUserData
)

router.put(
    '/',
    AuthMiddleware.auth,
    getUserController.getUserData
)

router.put(
    ':avatar',
    AuthMiddleware.auth,
    getUserController.getUserData
)


module.exports = router