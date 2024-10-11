import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserUsecaseModule } from './user/infrastructure/user-usecase.module';
import { UserControllerModule } from './user/infrastructure/controllers/user-controller.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TelegramModule,
    UserUsecaseModule.register(),
    UserControllerModule,
  ],
})
export class AppModule {}
