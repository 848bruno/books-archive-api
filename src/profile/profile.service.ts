import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepo: ProfileRepository,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const profile = this.profileRepo.create(createProfileDto);
    return this.profileRepo.save(profile);
  }

  findAll() {
    return this.profileRepo.find({ relations: ['user'] });
  }

  async findOne(id: string) {
    const profile = await this.profileRepo.findOne({ where: { id }, relations: ['user'] });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.findOne(id);
    Object.assign(profile, updateProfileDto);
    return this.profileRepo.save(profile);
  }

  async remove(id: string) {
    const profile = await this.findOne(id);
    return this.profileRepo.remove(profile);
  }
}
