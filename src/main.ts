import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception.filter';
import { LoggerFactory } from './app.logger-factory';

async function bootstrap() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.useLogger(LoggerFactory(config));
  app.useGlobalFilters(new HttpExceptionFilter());

  // For class-validator
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Nodinium')
      .setDescription('Cryptocurrency of (not so) new generation')
      .setVersion('1.0')
      .build(),
  );
  SwaggerModule.setup('api/docs', app, document);

  // Start application
  const port = config.get<number>('PORT');
  await app.listen(port);
  Logger.log(`Listening in ${process.env.NODE_ENV} mode on port ${port}`);
}
bootstrap();
