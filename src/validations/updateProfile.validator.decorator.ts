import validator from 'validator';
import constaint, { ValidationError } from '../constaint/constaint';
import CustomError from '../utils/custome.error';
import { UserUpdateInput }  from '../schema/profile.schema';
import RegisteredUserModel from '../models/registration.model';

export default function updateUserValidation(
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<Function>
) {
     const method = descriptor.value;
     descriptor.value = async function(args: UserUpdateInput) {
        const errors = [];

        if(!validator.isLength(args.firstName, { min: 3 }) ) {
            errors.push(ValidationError.INVALID_FIRST_NAME);
        }

        if(!validator.isLength(args.lastName, { min: 2 }) ) {
            errors.push(ValidationError.INVALID_LAST_NAME);
        }

        if(!validator.isEmail(args.email)) {
            errors.push(ValidationError.INVALID_EMAIL);
        }

        if(!validator.isLength(args.address, { min: 3 }) ) {
            errors.push(ValidationError.INVALID_ADDRESS);
        }
        if(!validator.isLength(String(args.phoneNumber), { min: 10, max: 10 })) {
            errors.push(ValidationError.INVALID_PHONE);
        }
        const existingUser = await RegisteredUserModel.findOne({ email: args.email });
        if(!constaint.ROLE.includes(args.role)) {
            errors.push(ValidationError.INVALID_ROLE);
        }

        if (args.role !== existingUser.role) {
            errors.push(ValidationError.ROLE_CANNOT_MODIFY);
        }

        if (errors.length > 0) {
            throw new CustomError(errors, 422);
        }

        return method.call(this, args);
    };
}