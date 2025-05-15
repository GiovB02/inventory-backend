import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://melaniegiovanna:K4FdNro4348AVHjv@cluster0.n9lcepl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    ProductsModule,
    AuthModule,
  ],
})
export class AppModule {}
