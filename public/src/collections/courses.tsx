import { buildCollection, buildProperty } from "firecms";
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
        avatar: buildProperty({
            name: "Avatar",
            dataType: "string",
            storage: {
                storagePath: "courses/avatar",
                acceptedFiles: ["image/*"]
            }
        }),
        title: buildProperty({
            name: "Title",
            dataType: "string",
            validation: { required: true }
        }),
        description: buildProperty({
            name: "Description",
            dataType: "string"
        }),
        available: buildProperty({
            name: "Available",
            dataType: "boolean"
        }),
        lecturers: buildProperty({
            name: "Lecturers",
            dataType: "array",
            of: {
                dataType: "reference",
                path: "lecturers"
            }
        })
    }
});
