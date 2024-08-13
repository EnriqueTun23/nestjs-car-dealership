import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // limpia la data que se esta esperando
      forbidNonWhitelisted: true, // esto lo que hace manda alertas oapara saber lo que tengo resivir en el body
    }),
  );
  await app.listen(3000);
}
bootstrap();
