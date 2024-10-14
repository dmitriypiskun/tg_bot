import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserUsecaseModule } from '../user-usecase.module';
import { FindUserByIdUserCase } from '../../usecases/find-user-by-id.usecase';
import { GetUsersUseCase } from '../../usecases/get-users.usecase';
import { CreateUserUseCase } from 'src/user/usecases/create-user.usecase.ts';
import { UserListPresenter, UserPresenter } from './user.presenter';
import { GetListDto } from './user.dto';

@Controller()
export class UserController {
  constructor(
    @Inject(UserUsecaseModule.FIND_USER_BY_ID_USECASE)
    private readonly getUserUsecase: FindUserByIdUserCase,

    @Inject(UserUsecaseModule.GET_USERS_USECASE)
    private readonly getUsersUsecase: GetUsersUseCase,

    @Inject(UserUsecaseModule.CREATE_USER_USECASE)
    private readonly createUserUsecase: CreateUserUseCase,
  ) {}

  @Get()
  async find(@Query('tgId') tgId: string): Promise<UserPresenter> {
    const user = await this.getUserUsecase.execute(tgId);
    return new UserPresenter(user);
  }

  @Get('admin')
  async getList(@Query() options: GetListDto): Promise<UserListPresenter> {
    const data = await this.getUsersUsecase.execute(options);
    return new UserListPresenter(data);
  }

  @Post()
  async create(@Body() data: any): Promise<UserPresenter> {
    const user = await this.createUserUsecase.execute(data);
    return new UserPresenter(user);
  }
}
