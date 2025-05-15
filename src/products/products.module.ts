import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product, ProductSchema } from './product.schema';  // Asegúrate de importar el esquema de producto

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),  // Registrar el modelo Product
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
