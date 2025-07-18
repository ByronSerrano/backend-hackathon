import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '@/src/filters/http-exception.filter';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from '@/src/config/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const configService = app.get(ConfigService);

  // Cors
  app.enableCors();

  // Config for swagger
  if (configService.get('DEVELOPMENT') === 'true') {
    const config = new DocumentBuilder()
      .setTitle('IA Parking API')
      .setDescription('Api for developers')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  // Apply global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
