import { InputType, Field, ObjectType } from 'type-graphql';
import { OneToMany } from 'typeorm';
import { Item } from './item.schema';

@InputType()
export class UserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    phoneNumber: number;

    @Field()
    address: string;

    @Field()
    role: string;
}

@ObjectType()
export class User {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    phoneNumber: number;

    @Field()
    address: string;

    @Field()
    role: string;

    @Field(type => [Item])
    @OneToMany(type => Item, item => item.user)
    items?: Item[];
}