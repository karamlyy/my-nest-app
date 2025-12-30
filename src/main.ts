import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Konfiqurasiyası
  const config = new DocumentBuilder()
    .setTitle('NestJS Railway App')
    .setDescription('Sadə Todo API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger /api adresində olacaq

  // CORS aktivləşdir (Frontend qoşulanda lazım olacaq)
  app.enableCors();

  // Railway dinamik port verir, ona görə process.env.PORT vacibdir!
  const port = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();