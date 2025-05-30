import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookReviewService } from 'src/bookreview/bookreview.service';
import { CreateBookReviewDto } from 'src/bookreview/dto/create-bookreview.dto';
import { UpdateBookreviewDto } from 'src/bookreview/dto/update-bookreview.dto';

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
  update(@Param('id') id: string, @Body() dto: UpdateBookreviewDto) {
    return this.bookReviewService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookReviewService.remove(id);
  }
}
