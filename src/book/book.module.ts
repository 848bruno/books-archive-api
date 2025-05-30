import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Author } from 'src/author/entities/author.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, Category])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
