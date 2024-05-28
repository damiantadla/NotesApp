import {AuthController, User} from 'firecms'

export enum Roles {
    SUPER_ADMIN = 'SUPER_ADMIN',
    LECTURER = 'LECTURER',
    USER = 'USER',
}

export const rolesDesc = {
    SUPER_ADMIN: 'Super Admin',
    LECTURER: 'LECTURER',
    USER: 'User',
}

export const rolesDefault = Roles.USER

export function isAdmin<UserType extends User = User>(authController: AuthController<UserType>) {
    return (
        authController.extra?.roles &&
        (authController.extra?.roles.includes(Roles.SUPER_ADMIN) || authController.extra?.roles.includes(Roles.LECTURER))
    )
}
