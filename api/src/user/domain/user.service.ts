import { User } from './user';
import {
  CreateUserData,
  GetListOptions,
  ListResult,
  UpdateUserData,
  UserRepository,
} from './user.repository';

export class UserService {
  constructor(readonly repository: UserRepository) {}

  async findById(id: string): Promise<User> {
    return this.repository.findById(id);
  }

  async findByTgId(tgId: string): Promise<User> {
    return this.repository.findByTgId(tgId);
  }

  async getList(options?: GetListOptions): Promise<ListResult> {
    return this.repository.getList(options);
  }

  async create(data: CreateUserData): Promise<User> {
    const userExist = await this.repository.findByTgId(data.tgId);

    if (!!userExist) {
      return userExist;
    }

    return this.repository.create(data);
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const userExist = await this.repository.findById(id);

    if (!userExist) {
      throw new Error('User not found');
    }

    return this.repository.update(id, { ...userExist, ...data });
  }
}
