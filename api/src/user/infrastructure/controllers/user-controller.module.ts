import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUsecaseModule } from '../user-usecase.module';

@Module({
  imports: [UserUsecaseModule.register()],
  controllers: [UserController],
})
export class UserControllerModule {}
