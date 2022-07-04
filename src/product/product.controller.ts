import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';

@Controller('product')
export class ProductController {
  @Post('create')
  async create(@Body() dto: Omit<ProductModel, '_id'>) {

  }

  @Get(':id')
  async getById(@Param('id') id: string) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @Post('find')
  async find(@Body() dto: FindProductDto) {

  }
}

// TODO: 11 минута на видео
