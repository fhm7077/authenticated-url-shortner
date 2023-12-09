import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(AuthMiddleware);
  await app.listen(4000);
}
bootstrap();
