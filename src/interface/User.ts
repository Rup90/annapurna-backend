import { Document } from 'mongoose';

import Item from './Item';

export default interface User extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: number;
    address: string;
    role: string;
    itemList?: Item[];
}