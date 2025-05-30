import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Author } from 'src/author/entities/author.entity';
import { Category } from 'src/category/entities/category.entity';
import { BookReview } from 'src/bookreview/entities/bookreview.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
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
