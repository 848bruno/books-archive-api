import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async create(dto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(dto);
    return this.authorRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: string, dto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    const updated = Object.assign(author, dto);
    return this.authorRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
  }
}
