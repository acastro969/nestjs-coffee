import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common/serializer';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    // Registra pipes globales para cada controlador de ruta HTTP. Los pipes permiten realizar validaciones y transformaciones en los datos que se reciben en las solicitudes HTTP
    new ValidationPipe({
      whitelist: true, // Elimina las propiedades no decoradas con class-validator de las solicitudes para evitar datos maliciosos
      transform: true, // Parsea automaticamente los datos entrantes al tipo de dato esperado. Si no se puede transformar, se lanzará una excepción BadRequestException. Por ejemplo, si los datos entrantes son un string que se puede parsear a numero, se convertirá automaticamente
      forbidNonWhitelisted: true, // En lugar de eliminar propiedades no decoradas, lanzará una excepción
      transformOptions: {
        enableImplicitConversion: true, // Intentará convertir los datos a los tipos esperados utilizando las reglas de conversión de tipos de JavaScript, además de cualquier conversión explicita basada en los tipos esperados en las clases
      },
    }),
  );

  app.useGlobalInterceptors(
    // Registra interceptors globales para cada HTTP route handler
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

  await app.listen(3000); // Inicia la aplicación en el puerto indicado
}
bootstrap();
