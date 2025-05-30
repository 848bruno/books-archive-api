import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
} from 'typeorm';
import { Book } from '../book/book.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: 'text', length: 500, nullable: true })
  description?: string;

  @ManyToMany(() => Book, (book) => book.categories)
  books: Book[];
}
