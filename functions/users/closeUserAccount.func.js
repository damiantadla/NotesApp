const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firestore = admin.firestore();

exports.default = functions.auth.user().beforeSignIn(async (user, context) => {
    try {
        const docSnapShot = await firestore.collection("users").doc(user.uid).get();
        const data = docSnapShot.data();

        if (data.block) {
            console.log("User is blocked");
            throw new Error('User is blocked');
        }
        return null;
    } catch (error) {
        console.log("Error fetching user record:", error);
        throw new functions.auth.HttpsError('internal', 'Unable to fetch user record', error.message);
    }
});
