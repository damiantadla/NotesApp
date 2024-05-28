const functions = require("firebase-functions");
const admin = require('firebase-admin')


exports.default = functions.firestore
    .document("users/{userId}")
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();

        if (oldValue.roles !== newValue.roles) {
            try {
                const roles = newValue.roles
                console.log(roles)
                await admin.auth().setCustomUserClaims(context.params.userId, {roles: roles})

                const user = await admin.auth().getUser(context.params.userId)
                console.log(user)
            } catch (error) {
                throw new Error("Error updating:" + error)
            }
        }

    })