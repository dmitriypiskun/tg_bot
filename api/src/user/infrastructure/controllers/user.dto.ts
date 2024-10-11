import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetListDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsString()
  search?: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  tgId: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string | null;

  @IsString()
  @IsOptional()
  phone?: string | null;

  @IsString()
  @IsOptional()
  userName?: string | null;

  @IsString()
  @IsOptional()
  language?: string | null;

  @IsString()
  @IsOptional()
  photo?: string | null;
}
