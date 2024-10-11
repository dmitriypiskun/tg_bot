import { User } from '../domain/user';
import { UserService } from '../domain/user.service';

export class FindUserByIdUserCase {
  constructor(private userService: UserService) {}

  async execute(id: string): Promise<User> {
    return this.userService.findById(id);
  }
}
