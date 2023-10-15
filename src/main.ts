import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

function initDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Open Chat')
    .setDescription('The Open Chat API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`docs`, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // prefix
  app.setGlobalPrefix('/api');

  // filters
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  // docs
  initDocs(app);

  await app.listen(3000);
}

void bootstrap();
