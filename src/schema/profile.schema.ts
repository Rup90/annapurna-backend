import { InputType, Field, ObjectType } from 'type-graphql';


@InputType()
export class UserInput {
    @Field()
    email: string;
}

@InputType()
export class UserUpdateInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    phoneNumber: Number;

    @Field()
    address: string;

    @Field()
    role: string;

    @Field()
    avatar: string;
}



@ObjectType()
export class UserInformations {
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    phoneNumber?: number;

    @Field()
    address?: string;

    @Field()
    role: string;

    @Field({ nullable: true })
    avatar?: String;
}