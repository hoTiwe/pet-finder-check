import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

dotenv.config();

const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const cors = require('cors');

  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

  app.use(cors(corsOptions)); // Use this after the variable declaration

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api');
  await app.listen(3010);
}
bootstrap();
