import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Profile } from '../profile/entities/profile.entity';
import { Author } from '../author/entities/author.entity';
import { Book } from '../book/entities/book.entity';
import { Category } from '../category/entities/category.entity';
import { BookReview } from '../bookreview/entities/bookreview.entity';
import { faker } from '@faker-js/faker';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  // Clear tables first (optional)
  await dataSource.getRepository(BookReview).clear();
  await dataSource.getRepository(Book).clear();
  await dataSource.getRepository(Category).clear();
  await dataSource.getRepository(Author).clear();
  await dataSource.getRepository(Profile).clear();
  await dataSource.getRepository(User).clear();

  // Create Users
  const userRepo = dataSource.getRepository(User);
  const user1 = userRepo.create({
    name: 'Bruno Ambale',
    email: 'bruno@example.com',
    password: 'Password123!',
  });
  const user2 = userRepo.create({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'JanePass123!',
  });
  await userRepo.save([user1, user2]);

  // Create Profiles
  const profileRepo = dataSource.getRepository(Profile);
  const profile1 = profileRepo.create({
    bio: 'Tech enthusiast',
    avatar: faker.image.avatar(),
    user: user1,
  });
  const profile2 = profileRepo.create({
    bio: 'Book reviewer',
    avatar: faker.image.avatar(),
    user: user2,
  });
  await profileRepo.save([profile1, profile2]);

  // Create Authors
  const authorRepo = dataSource.getRepository(Author);
  const author1 = authorRepo.create({
    name: 'Chinua Achebe',
    bio: 'Renowned Nigerian author.',
    birthDate: '1930-11-16',
  });
  const author2 = authorRepo.create({
    name: 'bad manas you guy\'o',
    bio: 'Kenyan writer and academic.',
    birthDate: '1938-01-05',
  });
  await authorRepo.save([author1, author2]);

  // Create Categories
  const categoryRepo = dataSource.getRepository(Category);
  const cat1 = categoryRepo.create({ name: 'Fiction', description: 'Fictional works' });
  const cat2 = categoryRepo.create({ name: 'History', description: 'Historical accounts' });
  await categoryRepo.save([cat1, cat2]);

  // Create Books
  const bookRepo = dataSource.getRepository(Book);
  const book1 = bookRepo.create({
    title: 'Things Fall Apart',
    description: 'A powerful African novel.',
    publicationYear: 1958,
    author: author1,
    categories: [cat1, cat2],
  });
  const book2 = bookRepo.create({
    title: 'The River Between',
    description: 'A tale of cultural conflict.',
    publicationYear: 1965,
    author: author2,
    categories: [cat1],
  });
  await bookRepo.save([book1, book2]);

  // Create BookReviews
  const reviewRepo = dataSource.getRepository(BookReview);
  const review1 = reviewRepo.create({
    content: 'A must-read classic.',
    rating: 5,
    user: user1,
    book: book1,
  });
  const review2 = reviewRepo.create({
    content: 'Insightful and moving.',
    rating: 4,
    user: user2,
    book: book2,
  });
  await reviewRepo.save([review1, review2]);

  console.log('Database seeded successfully!');
  await app.close();
}
bootstrap();
