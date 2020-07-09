import {
    Resolver,
    Arg,
    Mutation,
    Authorized,
    Ctx,
    Query
} from 'type-graphql';

import { ItemInput, Item } from '../schema/item.schema';
import { User } from '../schema/user.schema';
import ItemModel from '../models/item.model';
import JwdTokenPayload from 'interface/JwdTokenPayload';
import userModel from '../models/user.model';
import { Role } from '../constaint/constaint';

@Resolver()
export default class ItemResovler {

    @Authorized()
    @Mutation(returns => Item)
    async addItem(
        @Arg('itemInput') itemInput: ItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<Item> {
        const user =  await userModel.findById(ctx.user_id);
        const item = new ItemModel({
            name: itemInput.name,
            category: itemInput.category,
            quantity: itemInput.quantity,
            user: user
        });
        return await item.save();
    }

    @Authorized(Role.ADMIN)
    @Query(returns => [Item], { nullable: true })
    async allItemsList(): Promise<Item[]> {
        const items = await ItemModel.find()
            .populate({
                path: 'user',
                model: userModel,
                select: 'name email'
            });
        return items;
    }

    @Query(returns => [User])
    async itemList(@Ctx() ctx: JwdTokenPayload): Promise<User[]> {
        const userItem = await userModel.find({ '_id': ctx.user_id})
            .populate({
                path: 'itemList',
                select: '-_id -__v'
            });

        return userItem;
    }

}