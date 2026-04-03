import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() body: { name: string; price: number; categoryId: number; description?: string }) {
    return this.productService.create(body.name, body.price, body.categoryId, body.description);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }
}