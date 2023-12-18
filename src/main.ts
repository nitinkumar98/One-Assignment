import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('DB connected successfully with db url', process.env.DB_URL);
  await app.listen(3000);
}
bootstrap();
