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
import { NewItemInput, ItemAddConfirmation } from '../schema/items.schema';
import ItemLists from '../models/addItems.model';
import JwdTokenPayload from 'interface/JwdTokenPayload';
import { Role, NotificationType, ValidationError } from '../constaint/constaint';
import NotificationPayload from '../interface/Notification';
import { AddItemNotification } from '../schema/notification.schema';
import CustomError from '../utils/custome.error';
// const pubsub = new RedisPubSub();
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

    // @Subscription(returns => AddItemNotification, {
    //     topics: NotificationType.ADD_ITEMS,
    // })
    // newNotification(
    //     @Root() notificationPayload: NotificationPayload,
    //     // @PubSub() pubSub: RedisPubSub
    //     @PubSub() pubSub: PubSubEngine
    // ) {
    //     console.log(notificationPayload);
    //     pubSub.asyncIterator(NotificationType.ADD_ITEMS);
    //     // return pubSub.asyncIterator(NotificationType.ADD_ITEMS)
    //     // return {
    //     //     ...notificationPayload
    //     // };
    // }

    @Subscription(returns => AddItemNotification, {
        topics: NotificationType.ADD_ITEMS
    })
    newNotification(
        @PubSub() pubSub: PubSubEngine,
        @Arg('topic') topic: string,
        @Root() { itemName, message }: NotificationPayload,
    ) {
        console.log('itemName ==>', itemName);
        return pubSub.asyncIterator(NotificationType.ADD_ITEMS);
    }

}