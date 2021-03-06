export default class constaint {
    static JWT_PRIVATE_KEY: string = 'a5116fa8820526c5e88419ac9326ca18';
    static ROLE: string[] = ['ADMIN', 'FARMAR'];
    static CATEGORY: string[] = ['AGRICULTURE', 'DAIRY', 'LIVESTOCK'];
}

export const enum Role {
    ADMIN = 'ADMIN',
    FARMAR = 'FARMAR'
}

export const enum Category {
    AGRICULTURE = 'AGRICULTURE',
    DAIRY = 'DAIRY',
    LIVESTOCK = 'LIVESTOCK'
}

export const enum ValidationError {
    INVALID_NAME = 'INVALID_NAME',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_PASSWORD = 'INVALID_PASSWORD',
    INVALID_PHONE = 'INVALID_PHONE',
    INVALID_ROLE = 'INVALID_ROLE',
    INVALID_ADDRESS = 'INVALID_ADDRESS',
    USER_EXISTS = 'USER_EXISTS',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INVALID_EMAIL_PASSWORD = 'INVALID_EMAIL_PASSWORD'
}