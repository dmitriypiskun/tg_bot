import { User } from './user';

export interface CreateUserData {
  tgId: string;
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  userName?: string | null;
  language?: string | null;
  photo?: string | null;
}

export type UpdateUserData = Partial<CreateUserData>;

export interface GetListOptions {
  offset?: number;
  limit?: number;
  search?: string;
}

export interface ListResult {
  users: User[];
  count: number;
}

export interface UserRepository {
  findByTgId(tgId: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  getList(options?: GetListOptions): Promise<ListResult>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
}
