import {buildCollection, buildProperty, EntityReference} from "firecms";


export type Note = {
    title: string;
    note: string;
    image: string;
    available: boolean;
    atUpdate: any;
    atCreate: any;
}


export const notesCollection = buildCollection<Note>({
    path: "notes",
    name: "Note",
    properties: {
        title: {
            name: "Title",
            dataType: "string"
        },
        note: {
            name: "Note",
            dataType: "string",
            markdown: true
        },
        image: {
            name: "Image",
            dataType: "string",
            storage: {
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        },
        available: {
            name: "Available",
            dataType: "boolean"
        },
        atCreate: {
            name: "Created at",
            dataType: "date",
            autoValue: "on_create",
            readOnly: true
        },

        atUpdate: {
            name: "Updated at",
            dataType: "date",
            autoValue: "on_update",
            readOnly: true
        }
    }
})