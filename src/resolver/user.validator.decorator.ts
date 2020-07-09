import validator from 'validator';

import { UserInput }  from '../schema/user.schema';
import CustomError from '../utils/custome.error';
import UserModel from '../models/user.model';
import constaint, { ValidationError } from '../constaint/constaint';

export default function userInputValidation(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
) {
     const method = descriptor.value;
     descriptor.value = async function(args: UserInput) {
        const errors = [];

        if(!validator.isLength(args.name, { min: 3 }) ) {
            errors.push(ValidationError.INVALID_NAME);
        }

        if(!validator.isEmail(args.email)) {
            errors.push(ValidationError.INVALID_EMAIL);
        }

        if(!validator.isLength(args.password, { min: 6 }) ) {
            errors.push(ValidationError.INVALID_PASSWORD);
        }

        if(!validator.isLength(String(args.phoneNumber), { min: 10, max: 10 })) {
            errors.push(ValidationError.INVALID_PHONE);
        }

        if(!constaint.ROLE.includes(args.role)) {
            errors.push(ValidationError.INVALID_ROLE);
        }

        if(!validator.isLength(args.address, { min: 3 }) ) {
            errors.push(ValidationError.INVALID_ADDRESS);
        }

        const existingUser = await UserModel.findOne({ email: args.email });
        if(existingUser) {
            errors.push(ValidationError.USER_EXISTS);
        }

        if (errors.length > 0) {
            throw new CustomError(errors, 422);
        }

        return method.call(this, args);
    };
}