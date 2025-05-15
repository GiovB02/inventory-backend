import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() product: Product) {
        return this.productsService.create(product);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() product: Product) {
        return this.productsService.update(id, product);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }

    @Put(':id/inventory')
    async updateInventory(
        @Param('id') id: string,
        @Body('quantity') quantity: number,
    ) {
        return this.productsService.updateInventory(id, quantity);
    }
}
