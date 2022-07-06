import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';
// import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe)
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: ReviewModel) {

  // }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if(!deletedDoc) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {
    return this.reviewService.findByProductId(productId);
  }
}
