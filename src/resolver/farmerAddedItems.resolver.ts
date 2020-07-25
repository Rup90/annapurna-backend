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
import FarmarAddedItemLists from '../models/farmerAddedItems.model';
import JwdTokenPayload from '../interface/JwdTokenPayload';
import { Role } from '../constaint/constaint';
import { FarmerAddedAllItems, AdminOperation, AdminOperationResponse} from '../schema/farmer-added-items.schema';
import RegisteredUserModel  from '../models/registration.model';

@Resolver()
export default class FarmersAddedItemsResovler {

    @Authorized(Role.ADMIN)
    @Query(returns => [FarmerAddedAllItems], { nullable: true })
    async fetchFarmersAddedItems(
        @Ctx() ctx: JwdTokenPayload,
        @Arg('filteredBy') filteredBy: string
    ): Promise<FarmerAddedAllItems[]> {
        const allItems = await FarmarAddedItemLists.find().where('pickupStatus').equals(filteredBy);
        return await allItems;
    }

    @Authorized(Role.ADMIN)
    @Mutation(returns => AdminOperationResponse, { nullable: true })
    async adminOperation(
        @Ctx() ctx: JwdTokenPayload,
        @Arg('inputParams') inputParams: AdminOperation
    ): Promise<AdminOperationResponse> {
        await FarmarAddedItemLists.find()
                .where('u_id').equals(inputParams.u_id)
                .where('itemId').equals(inputParams.itemId)
                .update({$set:
                    {
                        pickupStatus: inputParams.pickupStatus,
                        adminComment: inputParams.adminComment
                    }
                });
        await RegisteredUserModel.findOneAndUpdate({_id: inputParams.u_id, itemsAdded: {$elemMatch: {id: inputParams.itemId}}},
            {$set: {'itemsAdded.$.pickupStatus': inputParams.pickupStatus,
                    'itemsAdded.$.adminComment': inputParams.adminComment
                }}, {
                        new: true,
                        upsert: true,
                        rawResult: true
                      });
        // const user = await RegisteredUserModel.findById(ctx.user_id);
        const response = {
            status: 200,
            message: 'Successfully updated'
        };
        return await response;
    }

}