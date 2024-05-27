import {buildCollection, buildProperty} from "firecms";

export type Lecturer = {
    name: string;
    surname: string;
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
        name: {
            name: "Name",
            dataType: "string",
            validation: {required: true}
        },
        surname: {
            name: "Surname",
            dataType: "string",
            validation: {required: true}
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
    }
});
