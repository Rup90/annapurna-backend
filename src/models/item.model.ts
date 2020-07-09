import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

import Item from '../interface/Item';
import constaint from '../constaint/constaint';

const ItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, enum: constaint.CATEGORY, required: true },
    quantity: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default mongoose.model<Item>('Items', ItemSchema);