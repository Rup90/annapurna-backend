import {
    Resolver,
    Arg,
    Mutation,
    Authorized,
    Subscription,
    Ctx,
    Query,
    Root,
    PubSub
} from 'type-graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { NewItemInput,
    ItemAddConfirmation,
    AddItemInput,
    DeleteItemInput,
    AllItemLists,
    FetchSelectedItemLists,
    FetchSelectedItemListsInput
} from '../schema/items.schema';
import ItemLists from '../models/addItems.model';
import JwdTokenPayload from 'interface/JwdTokenPayload';
import { Role, NotificationType, ValidationError } from '../constaint/constaint';
import NotificationPayload from '../interface/Notification';
import { AddItemNotification } from '../schema/notification.schema';
import CustomError from '../utils/custome.error';
import RegisteredUserModel from '../models/registration.model';
import SelectedItem from '../interface/SelectedItems';

@Resolver()
export default class ItemsResovler {

    @Authorized(Role.ADMIN)
    @Mutation(returns => ItemAddConfirmation)
    async addNewItem(
        @Arg('itemInput') itemInput: NewItemInput,
        @Ctx() ctx: JwdTokenPayload,
        @PubSub() pubSub: PubSubEngine
    ): Promise<ItemAddConfirmation> {
        console.log('ctx -->', ctx);
        const itemAdded = await ItemLists.findOne({ itemName: itemInput.itemName });
        if(itemAdded) {
            throw new CustomError([ValidationError.ITEM_ALREADY_ADDED], 401);
        } else {
            const item = new ItemLists({
                itemName: itemInput.itemName,
                category: itemInput.category,
                itemImage: itemInput.itemImage
            });
            item.save();
            const response = {
                itemName: itemInput.itemName,
                message: 'New Item Added'
            };
            await pubSub.publish(NotificationType.ADD_ITEMS, response);
            return  response;
        }
    }


    @Authorized(Role.FARMAR)
    @Mutation(returns => ItemAddConfirmation)
    async selectItem(
        @Arg('itemInput') itemInput: AddItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<ItemAddConfirmation> {
        const user = await RegisteredUserModel.findOne({ email: itemInput.email });
        //if (user['itemsAdded'].find()
        if(!user) {
            throw new CustomError([ValidationError.ITEM_ALREADY_ADDED], 401);
        } else {
            const find = user['itemsAdded'].filter(i => {
                return (i.itemName === itemInput.itemName);
            });
            const response = {
                itemName: itemInput.itemName,
                message: 'New Item Added'
            };
            if (find.length > 0) {
                response.message = 'Iteam already selected';
            } else {
                console.log(find);
                const item = {
                    itemName: itemInput.itemName,
                    category: itemInput.category,
                    id: itemInput.id,
                    quantity: itemInput.quantity,
                    pricePerKg: itemInput.pricePerKg
                };
                user['itemsAdded'].push(item);
                user.save();
            }
            return  response;
        }
    }

    @Authorized(Role.FARMAR)
    @Mutation(returns => ItemAddConfirmation)
    async updatetItem(
        @Arg('itemInput') itemInput: AddItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<ItemAddConfirmation> {
        const response = {
            itemName: itemInput.itemName,
            message: 'Item Not Added'
        };
        await RegisteredUserModel.findOneAndUpdate({email: itemInput.email, itemsAdded: {$elemMatch: {itemName: itemInput.itemName}}},
            {$set: {'itemsAdded.$.quantity': itemInput.quantity,
                    'itemsAdded.$.pricePerKg': itemInput.pricePerKg}}).then(res => {
                        if (res) {
                            response.message = 'Item Updated';
                        }
                    }, (err) => {
                        response.message = 'Something is wrong';
                    });
            return  response;
    }

    @Authorized(Role.FARMAR)
    @Mutation(returns => ItemAddConfirmation)
    async deletetItem(
        @Arg('itemInput') itemInput: DeleteItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<ItemAddConfirmation> {
        const response = {
            itemName: itemInput.itemName,
            message: 'Item Deleted'
        };
        await RegisteredUserModel.update({ email: itemInput.email }, { $pull: { itemsAdded : { itemName: itemInput.itemName } } },
            { safe: true }, (err, obj) => {
                console.log(err);
            });
            return  response;
    }

    @Query(returns => [AllItemLists])
    async fetchAllItems(): Promise<AllItemLists[]> {
        const itemAdded = await ItemLists.find();
        return itemAdded;
    }

    @Authorized(Role.FARMAR)
    @Query(returns => [FetchSelectedItemLists])
    async fetchAllSelectedItems(
        @Arg('userInput') userInput: FetchSelectedItemListsInput,
    ): Promise<FetchSelectedItemLists[]> {
        const user = await RegisteredUserModel.findOne({ email: userInput.email });
        if(user) {
            return  user['itemsAdded'];
        } else {
            throw new CustomError([ValidationError.USER_NOT_FOUND], 401);
        }
    }

    // @Subscription(returns => AddItemNotification, {
    //     topics: NotificationType.ADD_ITEMS
    // })fetchAllItems
    // newNotification(
    //     @PubSub() pubSub: PubSubEngine,
    //     @Arg('topic') topic: string,
    //     @Root() { itemName, message }: NotificationPayload,
    // ) {
    //     console.log('itemName ==>', itemName);
    //     return pubSub.asyncIterator(NotificationType.ADD_ITEMS);
    // }

}