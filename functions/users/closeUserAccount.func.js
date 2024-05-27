const functions = require("firebase-functions")

exports.default = functions.auth.user().beforeSignIn(async (user, context) => {
    if (user) {
        console.log(user)
    }
})