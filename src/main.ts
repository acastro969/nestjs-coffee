import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // Registers global pipes for use in HTTP route handling. Pipes allow for validations and transformations to be performed
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector), {
      exposeUnsetFields: false,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('nestjs-coffee')
    .setDescription('Coffees Api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
