const admin = require('firebase-admin')

const functions = require('firebase-functions');

const firestore = admin.firestore();

//function users-createUser

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
            } else {
                customRoles = customClaims.roles
                userDoc.roles = customRoles
            }
            await admin.auth().setCustomUserClaims(user.uid, {roles: customRoles})
            return firestore.collection('users').doc(user.uid).set(userDoc);
        } catch (error) {
            throw new Error("Error: " + error)
        }
    }
});
