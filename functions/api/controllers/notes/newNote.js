const functions = require("firebase-functions");

const newNote = functions.https.onRequest((req, res) => {
    res.send({"note": "new note"});
})

module.exports = {
    newNote
}