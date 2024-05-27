import {buildCollection, buildProperty} from "firecms"

export type Users = {
    uid: string;
    displayName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoURL: string;
    role: string;
}
export const usersCollection = buildCollection<Users>({
    path: "users",
    name: "Users",
    singularName: "Users",
    icon: "Person",
    properties: {
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
            validation: {required: true}
        },
        emailVerified: {
            name: "Email verify",
            dataType: "boolean",
        },
        phoneNumber: {
            name: "Phone number",
            dataType: "string",
        },
        photoURL: {
            name: "Avatar",
            dataType: "string",
            storage: {
                storagePath: "users/avatar",
                acceptedFiles: ["image/*"]
            }
        },
        role: {
            name: "Role",
            dataType: "string", // Zmieniono typ danych na string
            validation: {required: true},
            enumValues: {
                admin: "Admin",
                user: "User",
            }
        }
    },
    permissions: {
        edit: true,
        create: true,
        delete: true,
    }
})
