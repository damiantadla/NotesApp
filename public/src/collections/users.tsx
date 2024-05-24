import {buildCollection, buildProperty} from "firecms"

export type Users = {
    uid: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    phoneNumber: number;
    photoUrl: string;
    role: string;
}
export const usersCollection = buildCollection<Users>({
    path: "users",
    name: "Users",
    singularName: "Users",
    textSearchEnabled: true,
    icon: "Person",
    properties: {
        uid: buildProperty({
            name: "Id",
            dataType: "string",
            readOnly: true,
            validation: {required: true},
            columnWidth: 400
        }),
        displayName: buildProperty({
            name: "Name",
            dataType: "string",
            validation: {required: true}
        }),
        email: buildProperty({
            name: "Email",
            dataType: "string",
            validation: {required: true}
        }),
        emailVerified: buildProperty({
            name: "Email verify",
            dataType: "boolean",
        }),
        phoneNumber: buildProperty({
            name: "Phone number",
            dataType: "number",
        }),
        photoUrl: buildProperty({
            name: "Avatar",
            dataType: "string",
            storage: {
                storagePath: "users/avatar",
                acceptedFiles: ["image/*"]
            }
        }),
        role: buildProperty({
            name: "Role",
            dataType: "string",
            validation: {required: true}
        })
    },
    permissions: {
        edit: true,
        create: false,
        delete: true,
    }
})
