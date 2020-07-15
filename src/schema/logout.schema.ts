import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class LogoutInput {

    @Field()
    email: string;
}

@ObjectType()
export class LogoutConfirmation {
    @Field()
    message: string;
}