import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { BookreviewModule } from './bookreview/bookreview.module';

@Module({
  imports: [UserModule, ProfileModule, AuthorModule, BookModule, CategoryModule, BookreviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
