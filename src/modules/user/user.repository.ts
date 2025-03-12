import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepository } from 'src/repositories/base.repository';
import { User } from './user';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User) model: typeof User) {
    super(model);
  }
}
