import { Body, Controller, Get, Param, Patch, Post, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { EditCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    const category = await this.categoryService.getCategoryById(+id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  @Patch(':id')
  async editCategory(@Param('id') id: string, @Body() dto: EditCategoryDto) {
    return this.categoryService.editCategory(+id, dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
