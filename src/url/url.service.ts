/* eslint-disable prettier/prettier */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';
import { createHash } from 'crypto';


@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto, req: any): Promise<Url> {
    const { originalUrl } = createUrlDto;

    // Check if the URL already exists
    const existingUrl = await this.urlRepository.findOne({
      where: { originalUrl },
    });

    if (existingUrl) {
      throw new ConflictException('URL already exists');
    }
    //user ID from the token
    const userId = req.user.id;

    const shortUrl = this.generateShortUrl(originalUrl);

    const url = this.urlRepository.create({
      originalUrl,
      shortUrl,
      user: { id: userId },
    });

    await this.urlRepository.save(url);

    return url;
  }

  //create custom url
  async createCustom(createUrlDto: CreateUrlDto, req: any): Promise<Url> {
    const { originalUrl, customUrl } = createUrlDto;
    // Check if the custom URL already exists
    const existingUrl = await this.urlRepository.findOne({
      where: { shortUrl: `https://short-url/${customUrl}` },
    });

    if (existingUrl) {
      throw new ConflictException('Custom URL already exists');
    }

    const userId = req.user.id;

    // Customize the short URL 
    const shortUrl = `https://short-url/${customUrl}`;

    const url = this.urlRepository.create({
      originalUrl,
      shortUrl,
      user: { id: userId },
    });

    await this.urlRepository.save(url);

    return url;
  }
  
  private generateShortUrl(originalUrl: string): string {

    const hash = createHash('sha256').update(originalUrl).digest('hex').slice(0, 8);
  
    const shortUrl = `https://short-url/${hash}`;
  
    return shortUrl;
  }
  

  async findAll(userId: number): Promise<Url[]> {
    return this.urlRepository.find({ where: { user: { id: userId } } });
  }
  async findOneByShortUrl(shortUrl: string): Promise<Url | undefined> {
    return this.urlRepository.findOne({ where: { shortUrl } });
  }
}

