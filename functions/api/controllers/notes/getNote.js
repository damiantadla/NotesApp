const admin = require('firebase-admin');

const db = admin.firestore();

const getNote = async (req, res) => {
    const note = await db.collection(`courses/${req.body.course}/notes`).doc(req.body.id).get()
    if (!note.data()) {
        return res.status(404).json({message: 'Note not found'})
    }
    return res.status(200).json({id: note.id, ...note.data()})
}

const getNotes = async (req, res) => {
    const notes = await db.collection(`courses/${req.body.course}/notes`).get();
    const notesList = [];
    notes.forEach(note => {
        const notes = {[note.id]: note.data()}
        notesList.push(notes)
    })
    return res.status(200).json(notesList);
}

module.exports = {
    getNote,
    getNotes,
}