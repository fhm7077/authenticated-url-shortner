import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { UrlModule } from './url/url.module';
import { Url } from './url/entities/url.entity';
import { JwtMiddleware } from './auth/auth.middleware';

// import { UrlModule } from './url/url.module';

@Module({
  // imports: [UsersModule],
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'authenticated_url_shortner',
      entities: [User, Url],
      synchronize: true,
    }),
    UsersModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
