import {buildCollection, buildProperty} from "firecms";

export type Lecturer = {
    photoURL: string;
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: any;
    dateOfEmployment: any;
};

export const lecturerCollection = buildCollection<Lecturer>({
    path: "lecturers",
    name: "Lecturers",
    singularName: "Lecturer",
    textSearchEnabled: true,
    icon: "GroupAdd",
    properties: {
        photoURL: {
            name: "Avatar",
            dataType: "string",
            storage: {
                storagePath: "users/avatar",
                acceptedFiles: ["image/*"]
            }
        },
        uid: {
            name: "UID",
            dataType: "string",
            validation: {required: true},
            readOnly: true
        },
        displayName: {
            name: "Name",
            dataType: "string",
            validation: {required: true},
            readOnly: true
        },
        email: {
            name: "Surname",
            dataType: "string",
            validation: {required: true},
            readOnly: true
        },
        phoneNumber: {
            name: "Phone number",
            dataType: "string",
            validation: {required: true},
            readOnly: true,
        },
        dateOfBirth: {
            name: "Date of birth",
            dataType: "date",
            description: "Date of birth",
            mode: "date"
        },
        dateOfEmployment: {
            name: "Date of birth",
            dataType: "date",
            description: "Date of employment",
            mode: "date"
        }
    },
    permissions: {
        create: false,
        edit: true,
        delete: false,
        read: true
    }
});
