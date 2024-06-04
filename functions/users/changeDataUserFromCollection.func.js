/** TODO: Todać logike gdy maila się zmieni w kolekcji**/

const functions = require("firebase-functions")
const admin = require("firebase-admin")

const firestore = admin.firestore();

exports.default = functions.firestore
    .document("users/{userId}")
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();
        const {displayName, email} = change.after.data();

        try {
            await admin.auth().updateUser(context.params.userId, {
                displayName,
                email
            })
        } catch (error) {
            console.error(error)
            throw new functions.https.HttpsError("internal", "Error updating user", error.message)
        }
    })