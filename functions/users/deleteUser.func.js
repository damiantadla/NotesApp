const functions = require("firebase-functions")

const admin = require("firebase-admin")

const auth = admin.auth();

exports.default = functions.firestore
    .document("users/{docId}")
    .onDelete(async (snapshot, context) => {
        try {
            await auth.deleteUser(snapshot.id)
        } catch (error) {
            throw new Error("Error deleting")
        }
    })