import { DynamicModule, Module } from '@nestjs/common';
import { UserRepositoryImplementation } from './repositories/user.repository';
import { CreateUserUseCase } from '../usecases/create-user.usecase.ts';
import { UserService } from '../domain/user.service';
import { RepositoriesModule } from './repositories/repository.module';
import { ConfigModule } from '@nestjs/config';
import { GetUsersUseCase } from '../usecases/get-users.usecase';
import { FindUserByIdUserCase } from '../usecases/find-user-by-id.usecase';
import { UpdateUserUseCase } from '../usecases/update-user.usecase';

@Module({
  imports: [ConfigModule, RepositoriesModule],
})
export class UserUsecaseModule {
  static CREATE_USER_USECASE = 'createUserUsecase';
  static GET_USERS_USECASE = 'getUsersUsecase';
  static FIND_USER_BY_ID_USECASE = 'findUserByIdUsecase';
  static UPDATE_USER_USECASE = 'updateUserUsecese';

  static register(): DynamicModule {
    return {
      module: UserUsecaseModule,
      providers: [
        {
          inject: [UserRepositoryImplementation],
          provide: UserUsecaseModule.FIND_USER_BY_ID_USECASE,
          useFactory: (userRepository: UserRepositoryImplementation) =>
            new FindUserByIdUserCase(new UserService(userRepository)),
        },
        {
          inject: [UserRepositoryImplementation],
          provide: UserUsecaseModule.GET_USERS_USECASE,
          useFactory: (userRepository: UserRepositoryImplementation) =>
            new GetUsersUseCase(new UserService(userRepository)),
        },
        {
          inject: [UserRepositoryImplementation],
          provide: UserUsecaseModule.CREATE_USER_USECASE,
          useFactory: (userRepository: UserRepositoryImplementation) =>
            new CreateUserUseCase(new UserService(userRepository)),
        },
        {
          inject: [UserRepositoryImplementation],
          provide: UserUsecaseModule.UPDATE_USER_USECASE,
          useFactory: (userRepository: UserRepositoryImplementation) =>
            new UpdateUserUseCase(new UserService(userRepository)),
        },
      ],
      exports: [
        UserUsecaseModule.FIND_USER_BY_ID_USECASE,
        UserUsecaseModule.GET_USERS_USECASE,
        UserUsecaseModule.CREATE_USER_USECASE,
        UserUsecaseModule.UPDATE_USER_USECASE,
      ],
    };
  }
}
