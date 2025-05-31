// app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { BookreviewModule } from './bookreview/bookreview.module';
import { SeedModule } from './seed/seed.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule, // handles TypeORM config
    UsersModule,
    ProfileModule,
    AuthorModule,
    BookModule,
    CategoryModule,
    BookreviewModule,
    SeedModule,
  ],
})
export class AppModule {}
