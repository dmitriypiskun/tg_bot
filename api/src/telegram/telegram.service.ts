import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import TelegramBot = require('node-telegram-bot-api');
import { UserUsecaseModule } from 'src/user/infrastructure/user-usecase.module';
import { CreateUserUseCase } from 'src/user/usecases/create-user.usecase.ts';
import { UpdateUserUseCase } from 'src/user/usecases/update-user.usecase';

@Injectable()
export class TelegramService implements OnModuleInit {
  constructor(
    private readonly config: ConfigService,

    @Inject(UserUsecaseModule.CREATE_USER_USECASE)
    private readonly createUserUsecase: CreateUserUseCase,
    @Inject(UserUsecaseModule.UPDATE_USER_USECASE)
    private readonly updateUserUsecase: UpdateUserUseCase,
  ) {}

  async onModuleInit() {
    await this.botMessage();
  }

  async botMessage() {
    let user = null;

    const bot = new TelegramBot(this.config.get('TELEGRAM_BOT_TOKEN'), {
      polling: true,
    });

    bot.on('message', async (msg) => {
      const chatId = msg.chat.id;

      if (msg.text === '/start') {
        const photoURL = await this.getUserPhotoUrl(msg.from.id, bot);

        user = await this.createUserUsecase.execute({
          tgId: msg.from.id.toString(),
          firstName: msg.from.first_name,
          lastName: msg.from.last_name,
          userName: msg.from.username,
          language: msg.from.language_code,
          photo: photoURL,
        });

        await this.sendStartButton(chatId, bot);

        if (!user.phone) {
          await bot.sendMessage(
            chatId,
            'Пожалуйста, поделитесь вашим номером телефона',
            {
              reply_markup: {
                keyboard: [
                  [
                    {
                      text: 'Поделиться телефоном',
                      request_contact: true,
                    },
                  ],
                ],
                one_time_keyboard: true,
                resize_keyboard: true,
              },
            },
          );
        }
      }
    });

    bot.on('contact', async (msg) => {
      await this.updateUserUsecase.execute(user.id, {
        phone: msg.contact.phone_number,
      });

      await this.sendStartButton(msg.chat.id, bot);
    });
  }

  async sendStartButton(chatId: number, bot: TelegramBot) {
    await bot.sendMessage(
      chatId,
      'Для запуска web приложения нажмите кнопку ниже:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Start',
                web_app: { url: this.config.get('WEB_URL') },
              },
            ],
          ],
        },
      },
    );
  }

  async getUserPhotoUrl(
    userId: number,
    bot: TelegramBot,
  ): Promise<string | null> {
    const userProfilePhotos = await bot.getUserProfilePhotos(userId, {
      limit: 1,
    });

    if (!Array.isArray(userProfilePhotos.photos)) {
      return null;
    }

    const fileId = userProfilePhotos.photos[0][0].file_id;
    const file = await bot.getFile(fileId);
    return `https://api.telegram.org/file/bot${this.config.get('TELEGRAM_BOT_TOKEN')}/${file.file_path}`;
  }
}
