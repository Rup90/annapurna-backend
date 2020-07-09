import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import { hash } from 'bcrypt';

import { UserInput, User } from '../schema/user.schema';
import UserModel from '../models/user.model';
import userInputValidation from './user.validator.decorator';
import { Role } from '../constaint/constaint';
import AuthGuardRequest from '../interface/AuthGuardRequest';

@Resolver()
export default class UserResolver {

    @Authorized(Role.ADMIN)
    @Query(returns => [User], { nullable: true })
    async users(@Ctx() ctx: AuthGuardRequest): Promise<User[]> {
        const users =  await UserModel.find();
        return users;
    }

    @Authorized(Role.ADMIN)
    @userInputValidation
    @Mutation(returns => User)
    async addUser(@Arg('userInput') userInput: UserInput): Promise<User> {
       const hashedPassword = await hash(userInput.password, 12);
       const user = new UserModel({
            name: userInput.name,
            email: userInput.email,
            password: hashedPassword,
            phoneNumber: userInput.phoneNumber,
            address: userInput.address,
            role: userInput.role
       });
       return await user.save();
    }

}