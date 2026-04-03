import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductSeeder {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async run() {
    // 1️⃣ Create categories
    const electronics = this.categoryRepo.create({ name: 'Electronics', description: 'Phones, laptops, gadgets' });
    const fashion = this.categoryRepo.create({ name: 'Fashion', description: 'Clothes, shoes, accessories' });
    const books = this.categoryRepo.create({ name: 'Books', description: 'Novels, comics, textbooks' });

    await this.categoryRepo.save([electronics, fashion, books]);

    // 2️⃣ Create products
    const products: Partial<Product>[] = [
      { name: 'iPhone 15', price: 1200, category: electronics, description: 'Latest Apple iPhone' },
      { name: 'MacBook Pro 16"', price: 2500, category: electronics, description: 'Powerful laptop' },
      { name: 'Nike Air Max', price: 180, category: fashion, description: 'Comfortable sneakers' },
      { name: 'Leather Jacket', price: 300, category: fashion, description: 'Stylish leather jacket' },
      { name: 'Harry Potter Box Set', price: 90, category: books, description: 'Complete series' },
      { name: 'JavaScript Guide', price: 40, category: books, description: 'Learn JS from scratch' },
    ];

    for (const p of products) {
      const product = this.productRepo.create(p);
      await this.productRepo.save(product);
    }

    console.log('✅ Dummy categories and products inserted');
  }
}