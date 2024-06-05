const functions = require("firebase-functions");

// TODO: Dodać funkcje która zwraca
const createNote = functions.https.onRequest((req, res) => {
    res.send({"note": "new note"});
})

module.exports = {
    createNote
}