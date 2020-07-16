import { InputType, Field, ObjectType } from 'type-graphql';
import { OneToMany } from 'typeorm';
import { Item } from './item.schema';

@InputType()
export class RegistrationInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: string;
}

@ObjectType()
export class RegistrationConfirm {

    @Field()
    email: string;

    @Field()
    message: string;

    @Field()
    status: number;
}