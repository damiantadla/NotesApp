const admin = require('firebase-admin')

const db = admin.firestore();

const defaultLecturer = {
    displayName: "Lecturer",
    email: "example@example.pl",
}

const getLecturers = (lecturersList, lecturersData) => {
    return lecturersData.map(lecturer => {
        const foundLecturer = lecturersList.find(lecturerList => lecturerList.id === lecturer._path.segments[1]);
        if (foundLecturer && lecturer._path.segments[1]) {
            return {
                id: lecturer._path.segments[1],
                displayName: foundLecturer.displayName,
                email: foundLecturer.email,
            };
        } else {
            return {
                id: lecturer._path.segments[1],
                ...defaultLecturer
            }
        }
    });
}

const getCourses = async (req, res) => {
    try {
        const coursesSnapshot = await db.collection('courses').get();

        const lecturersSnapshot = await db.collection('lecturers').get()
        const lecturersList = lecturersSnapshot.docs.map(lecturer => {
            const {displayName, email} = lecturer.data()
            return {
                id: lecturer.id,
                displayName,
                email,
            }
        })

        const coursesList = coursesSnapshot.docs.map(doc => {
            const {title, description, avatar, lecturers} = doc.data();
            const lecturesCourses = [];
            if (!lecturers.length) {
                lecturesCourses.push(defaultLecturer)
            } else {
                lecturesCourses.push(...getLecturers(lecturersList, lecturers))
            }
            return {
                id: doc.id,
                title,
                description,
                avatar,
                lectures: lecturesCourses,
            };
        });

        return res.status(200).json({
            "status": "ok",
            "message": "Data returned successfully",
            "data": {
                "count": coursesList.length,
                "list": coursesList
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
}

const getCourse = async (req, res) => {
    const {id} = req.params;
    try {
        const course = await db.collection('courses').doc(id).get();
        const {title, description, avatar, lecturers} = course.data();
        if (!course.exists) return res.status(404).json({error: 'Course not found'});

        const lecturersSnapshot = await db.collection('lecturers').get()
        const lecturersList = lecturersSnapshot.docs.map(lecturer => {
            const {displayName, email} = lecturer.data()
            return {
                id: lecturer.id,
                displayName,
                email,
            }
        })

        const lecturesCourses = [];
        if (!lecturers.length) {
            lecturesCourses.push(defaultLecturer)

        } else {
            lecturesCourses.push(...getLecturers(lecturersList, lecturers))
        }
        return res.status(200).json({
            "status": "ok",
            "message": "Data returned successfully",
            "data": {
                id: course.id,
                title,
                description,
                avatar,
                lectures: lecturesCourses,
            }
        });

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

module.exports = {
    getCourses,
    getCourse
}