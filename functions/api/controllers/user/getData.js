const admin = require('firebase-admin');

const getUserData = async (req, res) => {
    const {uid, name, email, roles} = req.user
    return res.status(200).json({uid, name, email, roles})
}

module.exports = {
    getUserData
}