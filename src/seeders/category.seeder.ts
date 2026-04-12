import { DataSource } from "typeorm";
import { Category } from "../categories/entities/category.entity";


export const seedCategories = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Category);

  const categories = [
    {
      name: 'Electronics',
      description: 'Devices and gadgets',
    },
    {
      name: 'Fashion',
      description: 'Clothing and accessories',
    },
    {
      name: 'Home & Kitchen',
      description: 'Home essentials and kitchen items',
    },
    {
      name: 'Books',
      description: 'All kinds of books',
    },
    {
      name: 'Sports',
      description: 'Sports and fitness items',
    },
  ];

  for (const cat of categories) {
    const exists = await repo.findOne({ where: { name: cat.name } });

    if (!exists) {
      await repo.save(repo.create(cat));
    }
  }

  console.log('Categories seeded successfully..');
};