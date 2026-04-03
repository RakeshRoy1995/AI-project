import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSeeder } from './product/product.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Run seeder
  const seeder = app.get(ProductSeeder);
  await seeder.run();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
