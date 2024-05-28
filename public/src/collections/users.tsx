import {buildCollection, buildProperty} from "firecms"

export type Users = {
    uid: string;
    displayName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoURL: string;
    roles: any;
    block: boolean;
}
export const usersCollection = buildCollection<Users>({
    path: "users",
    name: "Users",
    singularName: "Users",
    icon: "Person",
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
            name: "Id",
            dataType: "string",
            readOnly: true,
            validation: {required: true},
            columnWidth: 400
        },
        displayName: {
            name: "Name",
            dataType: "string",
            validation: {required: true}
        },
        email: {
            name: "Email",
            dataType: "string",
            validation: {required: true}
        },
        password: {
            name: "Password",
            dataType: "string",
            validation: {required: true},
            disabled: false,
        },
        emailVerified: {
            name: "Email verify",
            dataType: "boolean",
            readOnly: true,
        },
        phoneNumber: {
            name: "Phone number",
            dataType: "string",
        },
        roles: {
            name: "Role",
            dataType: "array",
            validation: {required: true},
            of: {
                dataType: "string",
                enumValues: {
                    LECTURER: "Lecturer",
                    USER: "User",
                }
            }
        },
        block: {
            name: "Block",
            dataType: "boolean",
        }
    },
    propertiesOrder: ['photoURL', 'uid', 'displayName', 'email', 'emailVerified', 'phoneNumber', "roles", "block"],
    permissions: {
        edit: true,
        create: true,
        delete: true,
    }
})
