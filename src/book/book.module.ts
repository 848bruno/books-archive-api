import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Category])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
