import { Document } from 'mongoose';


export default interface ItemLists extends Document {
    id: string;
    itemName: string;
    category: string;
    itemImage: string;
}