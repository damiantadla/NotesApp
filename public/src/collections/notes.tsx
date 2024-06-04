import {buildCollection, buildEntityCallbacks, buildProperty, EntityReference} from "firecms";
import {getAuth} from 'firebase/auth';


export type Notes = {
    title: string;
    note: string;
    image: string;
    available: boolean;
    atUpdate: any;
    atCreate: any;
    createdByName: any;
    createdById: any;
}

const notesCallbacks = buildEntityCallbacks<Notes>({
    onPreSave: ({
                    values,
                    collection,
                    path,
                    entityId,
                    previousValues,
                    status

                }) => {
        if (entityId) {
            const auth = getAuth()
            console.log(auth.currentUser)
            values.createdByName = auth?.currentUser?.displayName;
            values.createdById = auth?.currentUser?.uid
        }
        return values
    }
})

export const notesCollection = buildCollection<Notes>({
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
        },
        createdByName: {
            name: "Created by",
            dataType: "string",
            readOnly: true
        },
        createdById: {
            name: "ID",
            dataType: "string",
            readOnly: true
        }
    },
    propertiesOrder: ['title', 'note', 'image', 'available', 'atUpdate', 'atCreate', "createdByName"],
    callbacks: notesCallbacks
})

