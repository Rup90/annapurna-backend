import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class LoginInput {

    @Field()
    email: string;

    @Field()
    password: string;
}

@ObjectType()
export class AuthData {
    @Field()
    token: string;

    @Field()
    user_id: string;

    @Field()
    role: string;

    @Field()
    expiresIn: number;
}