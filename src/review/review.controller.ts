import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {

  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ReviewModel) {

  }

  @Delete(':id')
  async delete(@Param('id') id: string) {

  }

  @Post()
  async find(@Param('productId') productId: string) {

  }
}
