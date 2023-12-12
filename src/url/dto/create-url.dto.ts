import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  originalUrl: string;

  @IsNotEmpty()
  @IsString()
  customUrl: string;
}
