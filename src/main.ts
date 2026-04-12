import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seedCategories } from './seeders/category.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dataSource = app.get(DataSource);

  await seedCategories(dataSource);

  console.log(" VERSION 7 LOADED");

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
