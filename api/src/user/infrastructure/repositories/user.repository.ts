import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import {
  CreateUserData,
  GetListOptions,
  ListResult,
  UpdateUserData,
  UserRepository,
} from '../../domain/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async findByTgId(tgId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ tgId });
    return user;
  }

  async getList(options?: GetListOptions): Promise<ListResult> {
    const where: FindOptionsWhere<User>[] = [];

    if (options?.search) {
      where.push(
        { firstName: Like(`%${options?.search}%`) },
        { lastName: Like(`%${options?.search}%`) },
        { userName: Like(`%${options?.search}%`) },
      );
    }

    const users = await this.userRepository.findAndCount({
      where,
      take: options.limit || 25,
      skip: options.offset || 0,
    });

    if (!Array.isArray(users)) {
      return { users: [], count: 0 };
    }

    return { users: users[0], count: users[1] };
  }

  async create(data: CreateUserData): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    return this.userRepository.save(data);
  }
}
