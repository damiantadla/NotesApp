const express = require('express')

const AuthMiddleware = require("../middleware/authMiddleware")
const getNotesController = require("../controllers/notes/getNote")
const createNotesController = require("../controllers/notes/createNote")
const deleteNotesController = require("../controllers/notes/deleteNote")
const router = express.Router()

router.post(
    '/',
    AuthMiddleware.auth,
    createNotesController.createNote
)

router.get(
    "/",
    AuthMiddleware.auth,
    getNotesController.getNote
)

router.get(
    "/:id",
    AuthMiddleware.auth,
    getNotesController.getNote
)

router.delete(
    "/",
    AuthMiddleware.auth,
    deleteNotesController.deleteNote
)

module.exports = router;