import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import { hash } from 'bcrypt';

import {UserInput,  UserInformations, UserUpdateInput } from '../schema/profile.schema';
import RegisteredUsers from '../models/registration.model';
import updateUserValidation from '../validations/updateProfile.validator.decorator';
import JwdTokenPayload from '../interface/JwdTokenPayload';

@Resolver()
export default class RegisteredUsersResolver {

    @Authorized()
    @Query(returns => UserInformations, { nullable: true })
    async getUserInfo(@Ctx() ctx: JwdTokenPayload): Promise<UserInformations> {
       const user = RegisteredUsers.findById(ctx.user_id);
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
            phoneNumber: userInput.phoneNumber,
            address: userInput.address,
            role: userInput.role
       };
       return await RegisteredUsers.findOneAndUpdate(filter, updatedInfo, {
         new: true
       });
    }

}