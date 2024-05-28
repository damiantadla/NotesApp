const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firestore = admin.firestore();

exports.default = functions.auth.user().onDelete(async (user, context) => {
    try {
        const path = user?.uid;
        if (!path) {
            throw new Error("Invalid document path");
        }

        await firestore.collection("users").doc(path).delete();
        console.log(`Successfully deleted user document with ID: ${path}`);
    } catch (error) {
        console.error("Error deleting user document: ", error);
        throw new Error("Error deleting: " + error.message);
    }
});