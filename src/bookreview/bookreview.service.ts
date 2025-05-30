import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookReview } from './entities/book-review.entity';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class BookReviewService {
  constructor(
    @InjectRepository(BookReview)
    private reviewRepo: Repository<BookReview>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateBookReviewDto): Promise<BookReview> {
    const book = await this.bookRepo.findOne({ where: { id: dto.bookId } });
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });

    if (!book || !user) {
      throw new NotFoundException('Book or User not found');
    }

    const review = this.reviewRepo.create({ ...dto, book, user });
    return this.reviewRepo.save(review);
  }

  findAll(): Promise<BookReview[]> {
    return this.reviewRepo.find({ relations: ['book', 'user'] });
  }

  async findOne(id: string): Promise<BookReview> {
    const review = await this.reviewRepo.findOne({ where: { id }, relations: ['book', 'user'] });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, dto: UpdateBookReviewDto): Promise<BookReview> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return this.reviewRepo.save(review);
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepo.remove(review);
  }
}
