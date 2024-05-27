const functions = require("firebase-functions")

//users-test

exports.default = functions.https.onRequest((req, res) => {
    console.log('Hello console1')
    res.status(200).send("Hello response");
})

