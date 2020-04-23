import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port || 3000;
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');
  await app.listen(port).then( () => { logger.log(`Application started on port ${port}`)});
}
bootstrap();
