/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Req, Get, Query,Res, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('short-url')
  @UseGuards(JwtAuthGuard)  // Apply JwtAuthGuard to the create method
  create(@Body() createUrlDto: CreateUrlDto, @Req() req: any) {
    return this.urlService.create(createUrlDto, req);
  }
  @Get('view-all')
  findAll() {
    return this.urlService.findAll();
  }
  @Get('redirect')
  async findOneByShortUrl(@Query('shortUrl') shortUrl: string) {
    const url = await this.urlService.findOneByShortUrl(shortUrl);

    if (!url) {
      throw new NotFoundException('Shortened URL not found');
    }

    return { originalUrl: url.originalUrl };
  }
}
