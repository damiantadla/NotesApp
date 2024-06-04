const functions = require("firebase-functions")
const admin = require("firebase-admin")

exports.default = functions.firestore
    .document("users/{userId}")
    .onCreate(async (snapshot, context) => {
        const {email, displayName, photoURL, password, phoneNumber} = snapshot.data();
        const uid = context.params.userId;
        try {

// Todo: Sprawdzic co sie dzieje z passwordem


            await admin.auth().createUser({
                uid,
                displayName,
                email,
                password,
                emailVerified: false,
                disabled: false,
            });
        } catch (error) {
            console.error("An error occurred:", error);
            throw new functions.https.HttpsError("internal", "Error creating user", error.message);
        }
    });
