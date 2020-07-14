import { Resolver, Query, Arg } from 'type-graphql';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { AuthData, LoginInput } from '../schema/login.schema';
import RegisteredUserModel from '../models/registration.model';
import CustomError from '../utils/custome.error';
import constaint, { ValidationError } from '../constaint/constaint';

@Resolver()
export default class LoginResolver {

    @Query(returns => AuthData, { nullable: false })
    async login(@Arg('loginInput') loginInput: LoginInput): Promise<AuthData> {
        const user = await RegisteredUserModel.findOne({ email: loginInput.email });
        if(!user) {
            throw new CustomError([ValidationError.USER_DOESNOT_EXISTS], 401);
        }
        const isEqual = await compare(loginInput.password, user.password);
        if(!isEqual) {
            throw new CustomError([ValidationError.INVALID_EMAIL_PASSWORD], 401);
        }
        const token = sign (
            {
                user_id: user.id,
                role: user.role
            },
            constaint.JWT_PRIVATE_KEY,
            { expiresIn: 60 * 60 }
        );
        return {
            token: token,
            user_id: user.id,
            role: user.role,
            expiresIn: 60 * 60
        };
    }
}
