import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // Registers global pipes for every HTTP route handler. Pipes allow for validations and transformations to be performed
    new ValidationPipe({
      whitelist: true, // Eliminates non (class-validator) decorated properties on requests to prevent malicious data
      transform: true, // Automatically parses the incoming data to the expected types. If it cannot be transformed it will throw a BadRequestException. Eg: If the incoming data is a string that can be parsed as a number, it will automatically convert it
      forbidNonWhitelisted: true, // Instead of eliminating non decorated properties it will throw an exception
      transformOptions: {
        enableImplicitConversion: true, // It will attempt to convert data to the expected types using the JavaScript's built-in type conversion rules in addition to any explicit conversions based on the expected types of your classes
      },
    }),
  );

  app.useGlobalInterceptors(
    // Registers global interceptors for every HTTP route handler.
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

  await app.listen(3000); // Starts the application in the desired port
}
bootstrap();
