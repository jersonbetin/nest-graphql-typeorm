import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();
  await app.listen(process.env.PORT || 3000);

  Logger.log(`Caosfit api graphql run on port ${process.env.port}`);
}
bootstrap();
