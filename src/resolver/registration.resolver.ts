import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { hash } from 'bcrypt';
import { RegistrationInput, RegistrationConfirm } from '../schema/registration.schema';
import RegisteredUserModel from '../models/registration.model';
import registrationInputValidation from '../validations/registration.validator.decorator';
import { sendConfirmationEmail } from '../utils/sendEmail';

@Resolver()
export default class RegistrationResolver {

    @registrationInputValidation
    @Mutation(returns => RegistrationConfirm)
    async registration(@Arg('userInput') userInput: RegistrationInput): Promise<RegistrationConfirm> {
       const hashedPassword = await hash(userInput.password, 12);
       const userModel = {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            email: userInput.email,
            password: hashedPassword,
            role: userInput.role,
            address: '',
            phoneNumber: '',
            avatar: ''
       };
       if (userInput.role === 'FARMAR') {
            userModel['itemsAdded'] = [];
            // userModel['itemsPicked'] = [];
       }
       const user = new RegisteredUserModel(userModel);
       user.save();
       const mailConfirmation = await sendConfirmationEmail(userInput.email, userInput.role);
       const confirmation = {
            email: userInput.email,
            message: 'Successfully registered. Please login',
            status: 200,
            mailInfo: mailConfirmation ? mailConfirmation : 'Something is wrong'
        };
       return await confirmation;
    }

}