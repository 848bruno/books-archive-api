import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
// import { ProfileRepository } from './profile.repository';

@Module({
  // Remove ProfileRepository if it does not exist or replace with the correct entity
  // imports: [TypeOrmModule.forFeature([ProfileRepository])],
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
