import { InputType, Field, ObjectType, ID } from 'type-graphql';

@InputType()
export class AdminOperation {

    @Field()
    pickupStatus: string;

    @Field()
    u_id: string;

    @Field()
    itemId: string;

    @Field()
    adminComment: string;
}

@ObjectType()
export class AdminOperationResponse {
    @Field()
    status: number;

    @Field()
    message: string;
}

@ObjectType()
export class FarmerAddedAllItems {
    @Field()
    id: string;

    @Field()
    itemName: string;

    @Field()
    category: string;

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
    u_id: string;

    @Field()
    userComment: string;

    @Field()
    adminComment: string;

    @Field()
    user_firstName: string;

    @Field()
    user_lastName: string;

    @Field()
    itemId: string;
}