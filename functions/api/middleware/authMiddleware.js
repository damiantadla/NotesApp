const admin = require("firebase-admin");

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({error: "Unauthorized"});
    }

    const idToken = authHeader.split("Bearer ")[1];

    try {
        req.user = await admin.auth().verifyIdToken(idToken);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: "Unauthorized"});
    }
}

module.exports = {
    auth: authMiddleware,
};
