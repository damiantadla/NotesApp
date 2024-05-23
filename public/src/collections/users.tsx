import {buildCollection, buildProperty} from "firecms"

export type Users = {
    name: string;
    surname: string;
    age: number;
}
export const usersCollection = buildCollection<Users>({
    path: "users",
    name: "Users",
    singularName: "Users",
    textSearchEnabled: true,
    icon: "Person",
    properties: {
        name: buildProperty({
            name: "Name",
            dataType: "string",
            validation: { required: true }
        }),
        surname: buildProperty({
            name: "Surname",
            dataType: "string",
            validation: { required: true }
        }),
        age: buildProperty({
            name: "Age",
            dataType: "number",
            validation: {
                required: true,
                min: 18,
                max: 72,
            }
        })
    }
})
