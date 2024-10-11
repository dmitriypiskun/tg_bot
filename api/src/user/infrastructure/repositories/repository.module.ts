import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Module } from '@nestjs/common';
import { UserRepositoryImplementation } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  providers: [UserRepositoryImplementation],
  exports: [UserRepositoryImplementation],
})
export class RepositoriesModule {}
