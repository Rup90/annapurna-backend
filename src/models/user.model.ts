import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

import constaint from '../constaint/constaint';
import User from '../interface/User';


const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: constaint.ROLE, required: true }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

UserSchema.virtual(
    'itemList',
    {
        ref: 'Items',
        foreignField: 'user',
        localField: '_id'
    }
);

export default mongoose.model<User>('Users', UserSchema);