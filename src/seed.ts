import { DataSource } from 'typeorm';
import { seedCategories } from './seeders/category.seeder';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});

async function runSeed() {
  await AppDataSource.initialize();

  await seedCategories(AppDataSource);

  await AppDataSource.destroy();
}

runSeed();