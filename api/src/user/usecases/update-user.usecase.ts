import { User } from '../domain/user';
import { UpdateUserData } from '../domain/user.repository';
import { UserService } from '../domain/user.service';

export class UpdateUserUseCase {
  constructor(private userService: UserService) {}

  async execute(id: string, data: UpdateUserData): Promise<User> {
    return this.userService.update(id, data);
  }
}
