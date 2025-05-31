import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
        inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const sslEnabled = configService.get('DB_SSL') === 'true';
        const dbConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: configService.getOrThrow<string>('DB_HOST'),
          port: configService.getOrThrow<number>('DB_PORT'),
          username: configService.getOrThrow<string>('DB_USERNAME'),
          password: configService.getOrThrow<string>('DB_PASSWORD'),
          database: configService.getOrThrow<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: configService.get<boolean>('DB_SYNC') ?? true,
          logging: configService.get<boolean>('DB_LOGGING') ?? false,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
          ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        };

        return dbConfig;
      },
    }),
  ],
})
export class DatabaseModule {}
