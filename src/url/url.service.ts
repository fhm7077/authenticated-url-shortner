/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { Url } from './entities/url.entity';
import { User } from '../users/entities/user.entity';
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
    // Get user ID from the token
    const userId = req.user.id;

    // Generate a short URL using nanoid
    const shortUrl = this.generateShortUrl(originalUrl);

    // Create a new URL entity
    const url = this.urlRepository.create({
      originalUrl,
      shortUrl,
      user: { id: userId },
    });

    // Save the URL to the database
    await this.urlRepository.save(url);

    return url;
  }

  private generateShortUrl(originalUrl: string): string {
    // hash of the original URL using sha256 algorithm 
    const hash = createHash('sha256').update(originalUrl).digest('hex').slice(0, 8);
  
    // Customize the short URL format as needed
    const shortUrl = `https://short-url/${hash}`;
  
    return shortUrl;
  }

  async findAll(): Promise<Url[]> {
    return this.urlRepository.find();
  }
  async findOneByShortUrl(shortUrl: string): Promise<Url | undefined> {
    return this.urlRepository.findOne({ where: { shortUrl } });
  }
}

//   findAll() {
//     return `This action returns all url`;
//   }
// }
