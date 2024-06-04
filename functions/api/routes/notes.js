const express = require('express')

const AuthMiddleware = require("../middleware/authMiddleware")
const getNotesController = require("../controllers/notes/getNote")
const createNotesController = require("../controllers/notes/newNote")
const deleteNotesController = require("../controllers/notes/deleteNote")
const router = express.Router()

router.post(
    '/newNote',
    AuthMiddleware.auth,
    createNotesController.newNote
)

router.get(
    "/getNote",
    AuthMiddleware.auth,
    getNotesController.getNote
)

router.get(
    "/getAllNotes",
    AuthMiddleware.auth,
    getNotesController.getNotes
)

router.delete(
    "/deleteNote",
    AuthMiddleware.auth,
    deleteNotesController.deleteNote
)

module.exports = router;