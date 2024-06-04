const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firestore = admin.firestore();

exports.default = functions.auth.user().beforeSignIn(async (user, context) => {
    try {
        if (user?.customClaims?.roles?.includes('SUPER_ADMIN')) return null;

        const docSnapShot = await firestore.collection("users").doc(user.uid).get();
        console.log(docSnapShot.data())
        const {block} = docSnapShot.data();

        if (block) {
            console.log("User is blocked");
            throw new functions.auth.HttpsError('permission-denied', 'User is blocked');
        }
        return null;
    } catch (error) {
        console.log("Error fetching user record:", error);
        throw new functions.auth.HttpsError('internal', 'Error fetching user record', error.message);
    }
});
