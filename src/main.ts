import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";


import {WsAdapter} from '@nestjs/platform-ws';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.useWebSocketAdapter(new WsAdapter(app));
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));
  await app.listen(3000);
}

bootstrap();
