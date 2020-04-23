import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  await app.listen(port).then( () => { logger.log(`Application started on port ${port}`)});
}
bootstrap();
