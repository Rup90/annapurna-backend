import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class NewItemInput {

    @Field()
    itemName: string;

    @Field()
    category: string;

    @Field()
    itemImage: string;
}

@ObjectType()
export class ItemAddConfirmation {
    @Field()
    itemName: string;

    @Field()
    message: string;
}