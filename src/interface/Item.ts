import { Document } from 'mongoose';
import User from './User';

export default interface Item extends Document {
    id: string;
    name: string;
    category: string;
    quantity: number;
    createdAt: string;
    user: User;
}