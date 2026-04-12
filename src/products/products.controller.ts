import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GeminiService } from '../gemini/gemini.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,
    private readonly geminiService: GeminiService,
  ) {}

  @Get('ai-description/:id')
  async getProductDescription(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);

    const prompt = `Write a short, catchy, and attractive product description for this product:
    Name: ${product.name}
    Price: ${product.price}
    Category: ${product.category.name}
    Description: ${product.description || 'No description provided'}`;

    // Call your Gemini AI client
    const aiResponse = await this.geminiService.generateContent(prompt);

    return {
      product,
      ai_description: aiResponse, // should be the generated text
    };
  }

  @Post('filter')
  async filterProducts(@Body('query') query: string) {
    const allProducts = await this.productsService.findAll();

    // Build prompt for Gemini
    const prompt = `
    You are a product assistant. 
    From the following list of products (name, price, category, category_description, stock), select the products that match the user's request:
    User request: "${query}"

    List of Products:
    ${allProducts
      .map(
        (p) =>
          `Name: ${p.name}, Price: ${p.price}, Category: ${p.category.name}, ${p.category.description} Stock: ${p.stock}`
      )
      .join('\n')}

    CRITICAL RULE:
    Must Return ONLY valid JSON. No explanation. No markdown. No text before or after.

    Rules : 
      1. The result must be parse to JSON like (JSON.parse) and must ensure no error 
      2. If no products found then return []
      3. Do not give any extra space or any character that makes error to parse JSON
      4. Give only JSON of Array
      5. ignore case sentative and spelling mistake
      6. No markdown (no \`\`\`)
      7. No explanation
      8. No extra text

    Example output : 
      Return a JSON array of product name only. like 
      1. "[ "I phone 12" , "TV"]"
      2. "[ "Nike" , "apple" ]"
      
    Before giving code please confirm the rules.
    `;

    const aiResponse = await this.geminiService.generate(prompt);
    // Remove Markdown code block if present
    let cleaned = aiResponse.trim()
      .replace(/^```json\s*/i, '')   // remove ```json at the start
      .replace(/```$/i, '');         // remove ``` at the end=
    console.log("🚀 ~ ProductsController ~ filterProducts ~ cleaned:", cleaned)

    let filteredIds: number[] = [];
    try {
      filteredIds = JSON.parse(cleaned);
    } catch (err) {
      console.error('AI filter parse error:', err);
      filteredIds = []; // fallback: empty array
    }

    // filteredIds contains names from AI
    const filteredNames: any[] = filteredIds;
    console.log("🚀 ~ ProductsController ~ filterProducts ~ filteredNames:", filteredNames)
    // Filter products safely by name
    const filteredProducts = allProducts.filter((p) => filteredNames.includes(p.name));
    console.log("🚀 ~ ProductsController ~ filterProducts ~ filteredProducts:", filteredProducts)
    return filteredProducts;
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
