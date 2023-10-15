import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

function initDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Open Chat')
    .setDescription('The Open Chat API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`docs`, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initDocs(app);

  await app.listen(3000);
}

void bootstrap();
