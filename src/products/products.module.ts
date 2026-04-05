<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { GeminiService } from '../gemini/gemini.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), 
  ],
  controllers: [ProductsController],
  providers: [ProductsService, GeminiService],
})
export class ProductsModule {}
=======
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { GeminiService } from '../gemini/gemini.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), 
  ],
  controllers: [ProductsController],
  providers: [ProductsService, GeminiService],
})
export class ProductsModule {}
>>>>>>> 0b8ae73e1d008395a53d950614601be4e2bc7d49
