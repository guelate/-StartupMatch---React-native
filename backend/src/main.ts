import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for React Native web and mobile
  app.enableCors({
    origin: [
      'http://localhost:8081',  // ← Expo web
      'http://localhost:19006', // ← Expo web (past port)
      'http://localhost:3000',  // ← localhost
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })


  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // delete all properties not defined in DTO when we receive it from client
    transform: true, // transformm all types properties as mentioned in DTO 
  }))
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
