import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOneBy({ id: dto.authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${dto.authorId} not found`);
    }

    const categories = await this.categoryRepository.findByIds(dto.categoryIds);
    if (categories.length !== dto.categoryIds.length) {
      throw new NotFoundException(`One or more categories not found`);
    }

    const book = this.bookRepository.create({
      ...dto,
      author,
      categories,
    });

    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: string, dto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id);

    if (dto.authorId) {
      const author = await this.authorRepository.findOneBy({ id: dto.authorId });
      if (!author) {
        throw new NotFoundException(`Author with ID ${dto.authorId} not found`);
      }
      book.author = author;
    }

    if (dto.categoryIds) {
      const categories = await this.categoryRepository.findByIds(dto.categoryIds);
      if (categories.length !== dto.categoryIds.length) {
        throw new NotFoundException(`One or more categories not found`);
      }
      book.categories = categories;
    }

    Object.assign(book, dto);
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }
}
