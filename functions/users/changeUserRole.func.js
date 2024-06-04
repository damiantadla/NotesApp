const functions = require("firebase-functions");
const admin = require('firebase-admin')

/** TODO: Dodać wyjątki / Poczytać o wyjątkach metod http**/
/** TODO: Refactor kodu **/
const firestore = admin.firestore();

exports.default = functions.firestore
    .document("users/{userId}")
    .onUpdate(async (change, context) => {
        const {roles: oldRoles} = change.before.data();
        const {roles: newRoles, uid, photoURL, displayName, email, phoneNumber} = change.after.data();
        if (oldRoles !== newRoles) {
            try {
                await admin.auth().setCustomUserClaims(context.params.userId, {roles: newRoles})
            } catch (error) {
                console.log(error)
                throw new functions.auth.HttpsError('internal', 'Error updating user roles', error.message);
            }
        }
        if (newRoles.includes("LECTURER")) {
            await firestore.collection("lecturers").doc(uid).set({
                photoURL,
                uid,
                displayName,
                email,
                phoneNumber
            })
        } else {
            await firestore.collection("lecturers").doc(uid).delete()
        }

    })