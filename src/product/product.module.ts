import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSeeder } from './product.seed';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryController } from 'src/category/category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductService, CategoryService, ProductSeeder],
  controllers: [ProductController, CategoryController],
})
export class ProductModule {}