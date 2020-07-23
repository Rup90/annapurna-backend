
import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import constaint from '../constaint/constaint';
import RegisteredUsers from '../interface/Registration';

const RegisteredUsersSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number},
    address: { type: String },
    role: { type: String, enum: constaint.ROLE, required: true },
    avatar: {type: String },
    itemsAdded: {type: Array },
    itemsPicked: {type: Array}
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


export default mongoose.model<RegisteredUsers>('RegisteredUsers', RegisteredUsersSchema);