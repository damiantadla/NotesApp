const express = require('express')

const AuthMiddleware = require('../middleware/authMiddleware')
const CoursesController = require("../controllers/courses/courses")

const router = express.Router()

router.get(
    "/",
    AuthMiddleware.auth,
    CoursesController.getCourses
)

router.get('/:id',
    AuthMiddleware.auth,
    CoursesController.getCourse
)

module.exports = router