import { InputType, Field, ObjectType, ID } from 'type-graphql';

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

@InputType()
export class AddItemInput {

    @Field()
    email: string;

    @Field()
    itemName: string;

    @Field()
    category: string;

    @Field()
    id: string;

    @Field()
    quantity: number;

    @Field()
    pricePerKg: number;
}

@InputType()
export class DeleteItemInput {

    @Field()
    email: string;

    @Field()
    itemName: string;
}

@ObjectType()
export class AllItemLists {
    @Field()
    itemName: string;

    @Field()
    category: string;

    @Field()
    itemImage: string;

    @Field()
    id: string;
}

@InputType()
export class FetchSelectedItemListsInput {
    @Field()
    email: string;
}

@ObjectType()
export class FetchSelectedItemLists {

    @Field()
    itemName: string;

    @Field()
    category: string;

    @Field()
    id: string;

    @Field()
    quantity: number;

    @Field()
    pricePerKg: number;
}