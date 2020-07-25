import { InputType, Field, ObjectType, ID } from 'type-graphql';

@InputType()
export class NewItemInput {

    @Field()
    itemName: string;

    @Field()
    category: string;
}

@ObjectType()
export class ItemAddConfirmation {
    @Field()
    itemName: string;

    @Field()
    message: string;

    @Field()
    status: number;
}

@InputType()
export class AddItemInput {

    @Field()
    itemName: string;

    @Field()
    category: string;

    @Field()
    id: string;

    @Field()
    quantity: string;

    @Field()
    pricePerKg: string;

    @Field()
    pickupDate: string;

    @Field()
    location: string;

    @Field()
    pickupTime: string;
}

@InputType()
export class UpdateItemInput {

    @Field()
    itemName: string;

    @Field()
    category: string;

    @Field()
    id: string;

    @Field()
    quantity: string;

    @Field()
    pricePerKg: string;

    @Field()
    pickupDate: string;

    @Field()
    location: string;

    @Field()
    pickupTime: string;

    @Field()
    adminComment?: string;

    @Field()
    userComment?: string;
}

@InputType()
export class DeleteItemInput {

    @Field()
    id: string;

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

    @Field()
    pickupDate: string;

    @Field()
    location: string;

    @Field()
    pickupTime: string;

    @Field()
    pickupStatus: string;

    @Field()
    itemId: string;

    @Field()
    userComment: string;

    @Field()
    adminComment: string;
}

@InputType()
export class DeleteAddedItem {
    @Field()
    itemName: string;
}