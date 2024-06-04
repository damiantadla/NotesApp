const functions = require("firebase-functions")
const admin = require("firebase-admin")

const auth = admin.auth();

async function userExists(uid) {
    try {
        const user = await auth.getUser(uid)
        return true
    } catch (error) {
        if (error.code === "auth/user-not-found") {
            return false
        }
        throw new functions.https.HttpsError("internal", "Error checking if user exists", error)
    }
}

exports.default = functions.firestore
    .document("users/{docId}")
    .onDelete(async (snapshot) => {
        const {uid} = snapshot.data()
        try {
            const exist = await userExists(uid)
            if (exist) {
                try {
                    await auth.deleteUser(uid)
                } catch (error) {
                    console.log(error)
                    throw new functions.https.HttpsError("internal", "Error deleting user", error)
                }
            }
        } catch (error) {
            console.log(error)
            throw new functions.https.HttpsError("internal", "Error get information", error.message)
        }
    })

