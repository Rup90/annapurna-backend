import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AddItemNotification {
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
    pickupStatus: string;

    @Field()
    u_id: string;

}