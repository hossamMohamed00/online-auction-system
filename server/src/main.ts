import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app.config.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	//* Setup Global validation pipes
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

	//* Setup Swagger here
	const config = new DocumentBuilder()
		.setTitle('Online Auction System 📃')
		.setDescription(
			'API description for all endpoints of Online Auction System.',
		)
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api-docs', app, document);

	//? Get app config for cors settings and starting the app.
	const appConfig: AppConfigService = app.get(AppConfigService);
	await app.listen(appConfig.port);
}
bootstrap();
