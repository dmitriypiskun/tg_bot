import { User } from '../domain/user';
import { GetListOptions, ListResult } from '../domain/user.repository';
import { UserService } from '../domain/user.service';

export class GetUsersUseCase {
  constructor(private userService: UserService) {}

  async execute(options?: GetListOptions): Promise<ListResult> {
    return this.userService.getList(options);
  }
}
