const admin = require('firebase-admin')

const functions = require('firebase-functions');

const db = admin.firestore();

//function users-createUser

exports.default = functions.auth.user().onCreate(async (user) => {
    if (user) {
        console.log(user)
        const userDoc = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL || 'users/avatar/avatar.png',
            emailVerified: user.emailVerified || false,
            phoneNumber: user.phoneNumber || 'No phone number',
            role: '',
        }
        try {
            await admin.auth().setCustomUserClaims(user.uid, {user: true})
            userDoc.role = "user"
            return db.collection('users').doc(user.uid).set(userDoc);
        } catch (error) {
            throw new Error("Error: " + error)
        }
    }
});
