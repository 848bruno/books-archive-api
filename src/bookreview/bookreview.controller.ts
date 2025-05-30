import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookReviewService } from './book-review.service';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';

@Controller('book-reviews')
export class BookReviewController {
  constructor(private readonly bookReviewService: BookReviewService) {}

  @Post()
  create(@Body() dto: CreateBookReviewDto) {
    return this.bookReviewService.create(dto);
  }

  @Get()
  findAll() {
    return this.bookReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookReviewService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBookReviewDto) {
    return this.bookReviewService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookReviewService.remove(id);
  }
}
