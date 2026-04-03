import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';

@Module({
  imports: [GeminiModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT!) || 5432,
      username: process.env.DB_USER || 'gemini_user',
      password: process.env.DB_PASS || 'password123',
      database: process.env.DB_NAME || 'gemini_ai',
      synchronize: true, // ⚠️ use false in production
      entities: [Product, Category],
    }),

    ProductModule,

    CategoryModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
