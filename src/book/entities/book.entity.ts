import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';
import { BookReview } from '../book-review/book-review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', length: 2000 })
  description: string;

  @Column()
  publicationYear: number;

  @Column({ default: true })
  isAvailable: boolean;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;

  @ManyToMany(() => Category, (category) => category.books, { eager: true })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => BookReview, (review) => review.book)
  reviews: BookReview[];
}
