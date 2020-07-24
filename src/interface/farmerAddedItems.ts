import { Document } from 'mongoose';

export default interface FarmarAddedItemLists extends Document {
    id: string;
    itemName: string;
    category: string;
    quantity: number;
    pricePerKg: number;
    pickupDate: string;
    location: string;
    pickupTime: string;
    pickupStatus: string;
    u_id: string;
    userComment: string;
    adminComment: string;
    user_firstName: string;
    user_lastName: string;
    itemId: string;
}