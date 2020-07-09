import { InputType, Field, ObjectType } from 'type-graphql';
import { User } from './user.schema';
import { ManyToOne } from 'typeorm';

@ObjectType()
export class Item {
    @Field()
    name: string;

    @Field()
    category: string;

    @Field()
    quantity: number;

    @ManyToOne(type => User, user => user.items)
    user: User;
}

@InputType()
export class ItemInput {
    @Field()
    name: string;

    @Field()
    category: string;

    @Field()
    quantity: number;
}