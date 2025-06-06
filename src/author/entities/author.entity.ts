import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true,})
  bio?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Book, book => book.author)
  books: Book[];
}
