import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { hash } from 'bcrypt';
import { RegistrationInput, RegistrationConfirm } from '../schema/registration.schema';
import RegisteredUserModel from '../models/registration.model';
import registrationInputValidation from '../validations/registration.validator.decorator';

@Resolver()
export default class RegistrationResolver {

    @registrationInputValidation
    @Mutation(returns => RegistrationConfirm)
    async registration(@Arg('userInput') userInput: RegistrationInput): Promise<RegistrationConfirm> {
       const hashedPassword = await hash(userInput.password, 12);
       const user = new RegisteredUserModel({
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            email: userInput.email,
            password: hashedPassword,
            phoneNumber: userInput.phoneNumber,
            address: userInput.address,
            role: userInput.role
       });
       user.save();
       const confirmation = {
           email: userInput.email,
           message: 'Successfully registered. Please login'
       };
       return await confirmation;
    }

}