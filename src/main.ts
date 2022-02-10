import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //? Setup validation pipes
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  //? Setup Swagger here
  const config = new DocumentBuilder()
    .setTitle('Online Auction System 📃')
    .setDescription(
      'API description for all endpoints of Online Auction System.',
    )
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('/api-docs', app, document);

  //? Use ConfigService to load the env files
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT', 3000));
}
bootstrap();
