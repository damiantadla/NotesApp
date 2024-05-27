const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.default = functions.firestore
    .document("users/{userId}")
    .onDelete(async (snap, context) => {
        try {
            await admin.auth().deleteUser(snap.data().uid)
        } catch (error) {
            throw new Error("Error deleting: " + error)
        }
    })