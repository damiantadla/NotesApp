const admin = require('firebase-admin');

const db = admin.firestore();

const getNote = async (req, res) => {
    if (req.body.id) {
        try {
            const noteSnapshot = await db.collection(`courses/${req.body.course}/notes`).doc(req.body.id).get()
            const {title, note, image, atCreate, atUpdate, createdBy} = noteSnapshot.data()
            if (!req.body.id) {
                return res.status(400).json({
                    message: 'Bad Request: Missing required fields'
                });
            }
            return res.status(200).json({
                status: "OK",
                message: "Successfully fetched the note",
                data: {
                    id: noteSnapshot.id,
                    title,
                    note,
                    image,
                    atCreate,
                    atUpdate,
                    createdBy,
                }
            })
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                message: 'Internal Server Error: Could not get the note'
            });
        }
    } else {
        const notes = await db.collection(`courses/${req.body.course}/notes`).get();
        const notesList = [];
        notes.forEach(note => {
            const notes = {[note.id]: note.data()}
            notesList.push(notes)
        })
        return res.status(200).json(notesList);
    }

}

module.exports = {
    getNote,
}