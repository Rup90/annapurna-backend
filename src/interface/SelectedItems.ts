import { Document } from 'mongoose';


export default interface SelectedItem extends Document {
    id: string;
    itemName: string;
    category: string;
    pricePerKg: number;
    quantity: number;
}