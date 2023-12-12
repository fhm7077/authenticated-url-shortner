/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Req, Get, Query, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Url } from './entities/url.entity';


@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('short-url')
  @UseGuards(JwtAuthGuard) 
  create(@Body() createUrlDto: CreateUrlDto, @Req() req: any) {
    return this.urlService.create(createUrlDto, req);
  }

  @Post('short-url-custom')
  @UseGuards(JwtAuthGuard) 
  createCustom(@Query() createUrlDto: CreateUrlDto, @Req() req: any) {
    return this.urlService.createCustom(createUrlDto, req);
  }  


  @Get('view-all')
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() request: Request): Promise<Url[]> {
    const userId = request['user'].id;
    return this.urlService.findAll(userId);
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
