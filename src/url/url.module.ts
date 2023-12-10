import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { JwtMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [UrlController],
  providers: [UrlService, JwtMiddleware],
})
export class UrlModule {}
