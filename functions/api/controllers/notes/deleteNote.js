const admin = require('firebase-admin');
const db = admin.firestore();

const deleteNote = async (req, res) => {
    const {uid} = req.user;

    if (!uid || !req.body.id || !req.body.course) {
        return res.status(400).json({
            message: 'Bad Request: Missing required fields'
        });
    }

    if (uid !== req.body.id) {
        return res.status(403).json({
            message: 'Forbidden: You are not allowed to delete this note'
        });
    }

    try {
        await db.collection(`courses/${req.body.course}/notes`).doc(req.body.id).delete();
        return res.status(200).json({
            message: 'Note deleted successfully'
        });
    } catch (error) {

        console.error('Error deleting note:', error);
        return res.status(500).json({
            message: 'Internal Server Error: Could not delete the note'
        });
    }
};

module.exports = {
    deleteNote
};
