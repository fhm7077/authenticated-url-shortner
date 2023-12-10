import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthMiddleware } from './auth/auth.middleware';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  app.enableCors();
  // app.use(AuthMiddleware);
  await app.listen(4000);
}
bootstrap();
