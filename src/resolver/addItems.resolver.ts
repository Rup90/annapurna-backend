import {
    Resolver,
    Arg,
    Mutation,
    Authorized,
    Subscription,
    Ctx,
    Query,
    Root
} from 'type-graphql';
import { PubSub} from 'graphql-subscriptions';
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
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Upload } from '../interface/Avatar';

@Resolver()
export default class ItemsResovler {

    public pubSUb: PubSub;
    constructor() {
        this.pubSUb = new PubSub();
    }

    @Authorized(Role.ADMIN)
    @Mutation(returns => ItemAddConfirmation)
    async addNewItem(
        @Ctx() ctx: JwdTokenPayload,
        @Arg('picture', () => GraphQLUpload) {
        createReadStream,
        filename
    }: Upload, @Arg('itemInput') itemInput: NewItemInput): Promise<ItemAddConfirmation> {
        const path = __dirname + `/../images/items/${filename}`;
        const userImagePath = `images/items/${filename}`;
        const file = createReadStream().pipe(createWriteStream(path));
        const itemAdded = await ItemLists.findOne({ itemName: itemInput.itemName });
        if(itemAdded) {
            throw new CustomError([ValidationError.ITEM_ALREADY_ADDED], 401);
        } else {
            const item = new ItemLists({
                itemName: itemInput.itemName,
                category: itemInput.category,
                itemImage: userImagePath
            });
            item.save();
            const response = {
                itemName: itemInput.itemName,
                message: 'New Item Added',
                status: 200
            };
            return  response;
        }
    }


    @Authorized(Role.FARMAR)
    @Mutation(returns => [FetchSelectedItemLists])
    async selectItem(
        @Arg('itemInput') itemInput: AddItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<FetchSelectedItemLists[]> {
        const user = await RegisteredUserModel.findById(ctx.user_id);
        if(!user) {
            throw new CustomError([ValidationError.ITEM_ALREADY_ADDED], 401);
        } else {
            const find = user['itemsAdded'].filter(i => {
                return (i.itemName === itemInput.itemName);
            });
            const response = {
                itemName: itemInput.itemName,
                message: 'New Item Added',
                status: 200
            };
            if (find.length > 0) {
                response.message = 'Iteam already selected';
                response.status = 401;
            } else {
                const item = {
                    itemName: itemInput.itemName,
                    category: itemInput.category,
                    id: itemInput.id,
                    quantity: itemInput.quantity,
                    pricePerKg: itemInput.pricePerKg,
                    pickupDate: itemInput.pickupDate,
                    location: itemInput.location,
                    pickupTime: itemInput.pickupTime,
                    pickupStatus: 'Pending'
                };
                user['itemsAdded'].push(item);
                user.save();
                const notficationPaylod = {
                    ...item,
                    u_id: ctx.user_id
                };
                console.log(notficationPaylod);
                this.pubSUb.publish('NOTIFICATIONS', {newNotification: notficationPaylod});
            }
            return  await user['itemsAdded'];
        }
    }

    @Authorized(Role.FARMAR)
    @Mutation(returns => [FetchSelectedItemLists])
    async updatetItem(
        @Arg('itemInput') itemInput: AddItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<FetchSelectedItemLists[]> {
        await RegisteredUserModel.findOneAndUpdate({_id: ctx.user_id, itemsAdded: {$elemMatch: {itemName: itemInput.itemName}}},
            {$set: {'itemsAdded.$.quantity': itemInput.quantity,
                    'itemsAdded.$.pricePerKg': itemInput.pricePerKg,
                    'itemsAdded.$.pickupDate': itemInput.pickupDate,
                    'itemsAdded.$.pickupTime': itemInput.pickupTime,
                    'itemsAdded.$.location': itemInput.location
                }}, {
                        new: true,
                        upsert: true,
                        rawResult: true
                      });
        const user = await RegisteredUserModel.findById(ctx.user_id);
        return  user['itemsAdded'];
    }

    @Authorized(Role.FARMAR)
    @Mutation(returns => [FetchSelectedItemLists])
    async deletetItem(
        @Arg('itemInput') itemInput: DeleteItemInput,
        @Ctx() ctx: JwdTokenPayload
    ): Promise<FetchSelectedItemLists[]> {
        const response = {
            itemName: itemInput.itemName,
            message: 'Item Deleted',
            status: 200
        };
        await RegisteredUserModel.update({ _id: ctx.user_id }, { $pull: { itemsAdded : { id: itemInput.id } } },
            { safe: true }, (err, obj) => {
                console.log(err);
            });
        const user = await RegisteredUserModel.findById(ctx.user_id);
        return  user['itemsAdded'];
    }

    @Query(returns => [AllItemLists])
    async fetchAllItems(): Promise<AllItemLists[]> {
        const itemAdded = await ItemLists.find();
        return itemAdded;
    }

    @Authorized()
    @Query(returns => [FetchSelectedItemLists], { nullable: true })
    async fetchAllSelectedItems(@Ctx() ctx: JwdTokenPayload): Promise<FetchSelectedItemLists[]> {
        const user = await RegisteredUserModel.findById(ctx.user_id);
        if(user) {
            return  user['itemsAdded'];
        } else {
            throw new CustomError([ValidationError.USER_NOT_FOUND], 401);
        }
    }

    @Subscription(returns => AddItemNotification, {
        topics: 'NOTIFICATIONS',
    })
    newNotification(
        @Root() notificationPayload: AddItemNotification
    ) {
        console.log('notificationPayload =>', notificationPayload);
        // this.pubSUb.asyncIterator(NotificationType.ADD_ITEMS);
        return notificationPayload;
    }


}