import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import { hash } from 'bcrypt';

import {UserInput,  UserInformations, UserUpdateInput } from '../schema/profile.schema';
import RegisteredUsers from '../models/registration.model';
import updateUserValidation from '../validations/updateProfile.validator.decorator';


@Resolver()
export default class RegisteredUsersResolver {

    @Authorized()
    @Query(returns => UserInformations, { nullable: true })
    async getUserInfo(@Arg('userInput') userInput: UserInput): Promise<UserInformations> {
       const user = RegisteredUsers.findOne({email: userInput.email});
       return await user;
    }

    @Authorized()
    @updateUserValidation
    @Mutation(returns => UserInformations)
    async updateUserInfo(@Arg('userInput') userInput: UserUpdateInput): Promise<UserInformations> {
       const filter = {email: userInput.email};
       const updatedInfo = {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            email: userInput.email,
            phoneNumber: userInput.phoneNumber,
            address: userInput.address,
            role: userInput.role,
            avatar: userInput.avatar
       };
       return await RegisteredUsers.findOneAndUpdate(filter, updatedInfo);
    }

}