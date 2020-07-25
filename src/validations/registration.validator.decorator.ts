import validator from 'validator';
import constaint, { ValidationError } from '../constaint/constaint';
import CustomError from '../utils/custome.error';
import { RegistrationInput }  from '../schema/registration.schema';
import RegisteredUserModel from '../models/registration.model';
import { APIError } from '../utils/error-handler/errorHandler';
export default function registrationInputValidation(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
) {
     const method = descriptor.value;
     descriptor.value = async function(args: RegistrationInput) {
        const errors = [];

        if(!validator.isLength(args.firstName, { min: 3 }) ) {
           //  errors.push(ValidationError.INVALID_FIRST_NAME);
           throw new APIError('registrationError', ValidationError.INVALID_FIRST_NAME, 422);
        }

        if(!validator.isLength(args.lastName, { min: 2 }) ) {
           // errors.push(ValidationError.INVALID_LAST_NAME);
            throw new APIError('registrationError', ValidationError.INVALID_LAST_NAME, 422);
        }

        if(!validator.isEmail(args.email)) {
            // errors.push(ValidationError.INVALID_EMAIL);
            throw new APIError('registrationError', ValidationError.INVALID_EMAIL, 422);
        }

        if(!validator.isLength(args.password, { min: 6 }) ) {
            // errors.push(ValidationError.INVALID_PASSWORD);
            throw new APIError('registrationError', ValidationError.INVALID_PASSWORD, 422);
        }

        // if (args.password !== args.confirmPassword) {
        //         errors.push(ValidationError.PASSWORD_MISMATCH);
        // }

        if(!constaint.ROLE.includes(args.role)) {
            // errors.push(ValidationError.INVALID_ROLE);
            throw new APIError('registrationError', ValidationError.INVALID_ROLE, 422);
        }

        const existingUser = await RegisteredUserModel.findOne({ email: args.email });
        if(existingUser) {
           //  errors.push(ValidationError.USER_EXISTS);
           throw new APIError('registrationError', ValidationError.USER_EXISTS, 422);
        }

        if (errors.length > 0) {
           // throw new APIError('registrationError', errors, 422);
        }

        return method.call(this, args);
    };
}