import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { BookreviewModule } from './bookreview/bookreview.module';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true,
      envFilePath: '.env',
     }), 
    TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.getOrThrow('DB_HOST'),
    port: configService.get<number>('DB_PORT') ?? 5432,
    username: configService.getOrThrow('DB_USERNAME'),
    password: configService.getOrThrow('DB_PASSWORD'),
    database: configService.getOrThrow('DB_NAME'),
    autoLoadEntities: true,
    synchronize: true,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false, 
      },
    },


      }),
    }),
    DatabaseModule,
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
