const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firestore = admin.firestore();

exports.default = functions.auth.user().onDelete(async (user, context) => {
    const userId = user.uid
    try {
        if (!userId) {
            console.error("Invalid user ID")
            throw new functions.https.HttpsError("invalid-argument", "Invalid user ID");
        }
        await firestore.collection("users").doc(userId).delete();
    } catch (error) {
        console.error("Error deleting: ", error);
        throw new functions.https.HttpsError("internal", "Error deleting user document", error)
    }
});