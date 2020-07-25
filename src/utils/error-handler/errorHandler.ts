import  logger  from '../../config/logs/logger';
export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

type ErrorCode = HttpStatusCode | 'DbErrorCode' | 'WsErrorCode' | 'FsErrorCode';


class AppError extends Error {
    public readonly name: string;
    public readonly statusCode: ErrorCode;
    public readonly isOperational: boolean;
    public customErrorDescription;
    constructor(
        name: string,
        description: string,
        httpCode: ErrorCode,
        isOperational: boolean
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);

        // Implement Logger Here
        this.customErrorDescription = {
            name: this.name,
            statusCode: this.statusCode,
            description: description
        };
        logger.log('error', this.customErrorDescription);
    }
}

export class APIError extends AppError {
    constructor(
        name: string,
        description: string = 'internal server error',
        httpCode: ErrorCode = HttpStatusCode.INTERNAL_SERVER,
        isOperational: boolean = true,
    ) {
        super(name, description, httpCode, isOperational);
    }
}

export class DBError extends AppError {
    constructor(
        name: string,
        description: string = 'Record processing error',
        dbErrorCode: ErrorCode = 'DbErrorCode',
        isOperational: boolean = true,
    ) {
        super(name, description, dbErrorCode, isOperational);
    }
}

// export class CommonError extends APIError {
//     constructor() {
//         super(name, description, dbErrorCode, isOperational);
//         console.log('=====??=======>', description);
//     }
// }