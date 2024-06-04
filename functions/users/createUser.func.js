const admin = require('firebase-admin')

const functions = require('firebase-functions');

const firestore = admin.firestore()

exports.default = functions.auth.user().onCreate(async (user) => {
    if (user) {
        const userDoc = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL || 'users/avatar/avatar.png',
            emailVerified: user.emailVerified || false,
            phoneNumber: user.phoneNumber || 'No phone number',
            block: false,
            roles: '',
        }
        try {
            const userData = await admin.auth().getUser(user.uid)
            const customClaims = userData.customClaims || {}
            let customRoles;
            if (!customClaims.roles) {
                customRoles = ["USER"]
                userDoc.roles = customRoles
                await firestore.collection('users').doc(user.uid).set(userDoc);
            } else {
                customRoles = customClaims.roles
                userDoc.roles = customRoles
            }
            await admin.auth().setCustomUserClaims(user.uid, {roles: customRoles})
        } catch (error) {
            console.log(error)
            throw new functions.https.HttpsError("internal", "Error creating user document", error.message)
        }
    }
});
