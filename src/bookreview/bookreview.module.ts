import { Module } from '@nestjs/common';
import { BookReviewService } from './bookreview.service';
import { BookReviewController } from './bookreview.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookReview } from './entities/bookreview.entity';

@Module({
  imports:[DatabaseModule,TypeOrmModule.forFeature([BookReview])],
  controllers: [BookReviewController],
  providers: [BookReviewService],
})
export class BookreviewModule {}
