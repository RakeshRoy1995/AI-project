import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // 👈 Important!
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService], // optional if used elsewhere
})
export class CategoryModule {}