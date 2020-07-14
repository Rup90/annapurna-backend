import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import ItemLists from '../interface/ItemLists';
import constaint from '../constaint/constaint';

const AddItemSchema: Schema = new Schema({
    itemName: { type: String, required: true },
    category: { type: String, enum: constaint.CATEGORY, required: true },
    itemImage: { type: String }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model<ItemLists>('ItemLists', AddItemSchema);