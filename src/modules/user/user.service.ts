import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import {User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }

  public async find(userId: number): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
  
    return user;
  }
}