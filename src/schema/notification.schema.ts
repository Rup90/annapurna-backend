import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AddItemNotification {
    @Field()
    itemName: string;

    @Field()
    message: string;

}