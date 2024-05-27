import {buildCollection, buildProperty} from "firecms";
import {notesCollection} from "./notes.tsx";

export type Course = {
    title: string;
    description: string;
    avatar: string;
    available: boolean;
    lecturers: string[];  // Adjust type to match references
};

export const coursesCollection = buildCollection<Course>({
    path: "courses",
    name: "Courses",
    singularName: "Course",
    icon: "School",
    subcollections: [notesCollection],
    properties: {
        avatar: {
            name: "Avatar",
            dataType: "string",
            storage: {
                storagePath: "courses/avatar",
                acceptedFiles: ["image/*"]
            }
        },
        title: {
            name: "Title",
            dataType: "string",
            validation: {required: true}
        },
        description: {
            name: "Description",
            dataType: "string"
        },
        available: {
            name: "Available",
            dataType: "boolean"
        },
        lecturers: {
            name: "Lecturers",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "lecturers"
            }
        }
    }
});
