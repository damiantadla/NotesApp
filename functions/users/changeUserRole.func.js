const functions = require("firebase-functions");
const admin = require('firebase-admin')


exports.default = functions.firestore
    .document("users/{userId}")
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();
        if (oldValue.role !== newValue.role) {
            try {
                const customClaims = {};
                customClaims[newValue.role] = true;
                await admin.auth().setCustomUserClaims(context.params.userId, customClaims)
            } catch (error) {
                throw new Error("Error updating:" + error)
            }
        }
        try {
            const adminData = await admin.auth().getUser("O2tsr8ZBeAWFflI7HEizcNN20tVt")
            console.log(adminData)
            const user = await admin.auth().getUser("nXvqN5n95wmrzONzYQFNmyYDFsc1")
            console.log(user)
        } catch (error) {

        }
    })