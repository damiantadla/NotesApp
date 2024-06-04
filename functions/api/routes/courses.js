const express = require('express')

const AuthMiddleware = require('../middleware/authMiddleware')
const CoursesController = require("../controllers/courses/courses")

const router = express.Router()

router.get(
    "/getAll",
    AuthMiddleware.auth,
    CoursesController.getCourses
)

router.get('/get',
    AuthMiddleware.auth,
    CoursesController.getCourse
)

module.exports = router