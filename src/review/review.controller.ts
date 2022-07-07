import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { CreateReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';
// import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe)
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  // @Patch(':id')
  // async patch(@Param('id') id: string, @Body() dto: ReviewModel) {

  // }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if(!deletedDoc) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string, @UserEmail() email: string) {
    return this.reviewService.findByProductId(productId);
  }
}
