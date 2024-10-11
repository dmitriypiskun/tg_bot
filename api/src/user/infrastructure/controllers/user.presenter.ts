import { ListResult } from 'src/user/domain/user.repository';
import { User } from '../entities/user.entity';

export class UserPresenter {
  id: string;
  tgId: string;
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  userName?: string | null;
  language?: string | null;
  photo?: string | null;
  createdAt: Date;

  constructor(data: User) {
    this.id = data.id;
    this.tgId = data.tgId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.userName = data.userName;
    this.language = data.language;
    this.photo = data.photo;
    this.createdAt = data.createdAt;
  }
}

export class UserListPresenter {
  users: UserPresenter[];
  count: number;

  constructor(data: ListResult) {
    this.count = data.count;
    this.users = data.users.map((item) => new UserPresenter(item));
  }
}
