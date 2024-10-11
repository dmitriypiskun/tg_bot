import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TelegramService } from './telegram.service';
import { UserUsecaseModule } from 'src/user/infrastructure/user-usecase.module';

@Module({
  imports: [ConfigModule, UserUsecaseModule.register()],
  providers: [TelegramService],
})
export class TelegramModule {}
