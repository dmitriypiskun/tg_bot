import { User } from '../domain/user';
import { CreateUserData } from '../domain/user.repository';
import { UserService } from '../domain/user.service';

export class CreateUserUseCase {
  constructor(private userService: UserService) {}

  async execute(data: CreateUserData): Promise<User> {
    return this.userService.create(data);
  }
}
