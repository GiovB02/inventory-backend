import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

export interface Product extends Document {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
}
