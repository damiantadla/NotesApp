import {
    buildCollection,
    buildEntityCallbacks,
    EntityOnDeleteProps,
    EntityOnSaveProps,
    toSnakeCase,
    EntityOnFetchProps, User, EntityValues
} from "firecms"

function isValidEmail(value: any): any {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function checkLength(value: any, length: number): boolean {
    return value.length >= length;
}

export type Users = {
    uid: string;
    displayName: string;
    email: string;
    password: string;
    emailVerified: boolean;
    phoneNumber: string;
    photoURL: string;
    roles: any;
    disabled: boolean;
}

const userCallbacks = buildEntityCallbacks({

    onPreSave: ({
                    collection,
                    path,
                    entityId,
                    values,
                    previousValues,
                    status
                }) => {

        if (!isValidEmail(values.email)) throw new Error("Invalid email");
        if (values.displayName && !checkLength(values.displayName, 4)) throw new Error("Name is too short")
        if (values.password && !checkLength(values.password, 8)) throw new Error("Password is too short")
        console.log(status)
        return values
    },

    onSaveFailure: (props: EntityOnSaveProps<Users>) => {
        console.log("onSaveFailure", props);
    },

});


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
            validation: {
                required: true,
            }
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
        disabled: {
            name: "Disabled",
            dataType: "boolean",
        }
    },
    propertiesOrder: ['photoURL', 'uid', 'displayName', 'email', 'emailVerified', 'phoneNumber', "roles", "disabled"],
    permissions: {
        edit: true,
        create: true,
        delete: true,
    },
    callbacks: userCallbacks
})
