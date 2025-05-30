import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookReview } from 'src/bookreview/entities/bookreview.entity';
import { CreateBookReviewDto } from 'src/bookreview/dto/create-bookreview.dto';
import { UpdateBookreviewDto } from 'src/bookreview/dto/update-bookreview.dto';
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

  async update(id: string, dto: UpdateBookreviewDto): Promise<BookReview> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return this.reviewRepo.save(review);
  }

  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepo.remove(review);
  }
}
