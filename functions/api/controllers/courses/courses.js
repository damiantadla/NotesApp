const admin = require('firebase-admin')

const db = admin.firestore();

const getCourses = async (req, res) => {
    try {
        console.log('get courses')
        const courses = await db.collection('courses').get();
        const coursesList = [];
        courses.forEach(course => {
            const courses = {[course.id]: course.data()}
            coursesList.push(courses)
        })
        return res.status(200).json(coursesList);
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

const getCourse = async (req, res) => {
    console.log(req.body.id)
    try {
        const course = await db.collection("courses").doc(req.body.id).get();
        if (!course.data()) return res.status(404).json({error: 'Course not found'})
        return res.status(200).json({id: course.id, ...course.data()});
    } catch (error) {
        return res.status(500).json({error: error});
    }
}

module.exports = {
    getCourses,
    getCourse
}