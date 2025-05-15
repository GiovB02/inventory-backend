import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
    ) {}

    async create(product: Product): Promise<Product> {
        try {
            const createdProduct = new this.productModel(product);
            return await createdProduct.save();
        } catch (error) {
            throw new Error('Error creating product: ' + error.message);
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async update(id: string, product: Product): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, { new: true }).exec();
        if (!updatedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return updatedProduct;
    }

    async remove(id: string): Promise<Product> {
        const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
        if (!deletedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return deletedProduct;
    }

    async updateInventory(id: string, quantity: number): Promise<Product> {
        const product = await this.productModel.findById(id).exec();

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        product.quantity += quantity;

        if (product.quantity < 0) {
            throw new Error('No hay suficiente stock para realizar esta operación');
        }

        await product.save();
        return product;
    }
}
