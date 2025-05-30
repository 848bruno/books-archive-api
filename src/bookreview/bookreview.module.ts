import { Module } from '@nestjs/common';
import { BookReviewService } from './bookreview.service';
import { BookReviewController } from './bookreview.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReview } from './entities/bookreview.entity';
import { BookModule } from 'src/book/book.module';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';


@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([BookReview, Book,User,])],
  controllers: [BookReviewController],
  providers: [BookReviewService],
})
export class BookreviewModule {}
