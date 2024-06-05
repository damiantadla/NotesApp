const express = require('express')

const AuthMiddleware = require('../middleware/authMiddleware')
const AuthController = require("../controllers/auth/logout")

const router = express.Router()

router.post(
    "/logout",
    AuthController.logout
)

module.exports = router