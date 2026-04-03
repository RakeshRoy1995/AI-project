import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(
    name: string,
    price: number,
    categoryId: number,
    description?: string
  ) {
    const category = await this.categoryRepo.findOneBy({ id: categoryId });

    if (!category) {
      throw new Error('Category not found');
    }

    const product = this.productRepo.create({
      name,
      price,
      description,
      category, // now guaranteed to be non-null
    });

    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find({ relations: ['category'] });
  }
}