After completing the NestJS Fundamentals Course, I noticed that there were some unfinished aspects in the application I created. Consequently, I decided to continue working on these aspects by finishing and refactoring the ratings module and documenting it.

The purpose of this repository is to serve as a reference for me in the future regarding the core aspects and commands of NestJS. Additionally, it also provides a small example application for anyone interested in building NestJS applications.

At the moment, I am in the process of completing the information in this README. It is worth noting that the best way to learn about NestJS is by utilizing its official documentation and courses. The information presented below is intended to provide a condensed overview of the framework and its features.

## Table of Contents

- [Getting Started: Commands](#getting-started--commands)
  - [Install NestJs CLI globally](#install-nestjs-cli-globally)
  - [Output all Nest commands](#output-all-nest-commands)
  - [Create an application](#create-an-application)
  - [Start Nest application](#start-nest-application)
  - [Run application in development mode](#run-application-in-development-mode)
  - [Generate a Controller](#generate-a-controller)
  - [Generate a Service](#generate-a-service)
  - [Generate a Module](#generate-a-module)
  - [Generate a Pipe](#generate-a-pipe)
  - [Generate a Middleware](#generate-a-middleware)
  - [Install mapped-types](#install-mapped-types--ex--for-partialtype-usage-)
  - [Generate a Guard](#generate-a-guard)
  - [Generate an Interceptor](#generate-an-interceptor)
  - [Start Docker containers in background mode](#start-docker-containers-in-background-mode)
  - [Stop Docker containers](#stop-docker-containers)
  - [Install TypeORM](#install-typeorm)
  - [Create class (ex: Dto)](#create-class--ex--dto-)
  - [Create an entity](#create-an-entity)
  - [Create a TypeOrm Migration](#create-a-typeorm-migration)
  - [Running a Migration](#running-a-migration)
  - [Revert a Migration](#revert-a-migration)
  - [Create Automatic TypeORM Migration](#create-automatic-typeorm-migration)
  - [Install NestJs config](#install-nestjs-config)
  - [Installing JOI for validations](#installing-joi-for-validations)
  - [Install Swagger](#install-swagger)
  - [Install class-validator and class-transformer](#install-class-validator-and-class-transformer)
  - [Run Jest Unit Tests](#run-jest-unit-tests)
  - [Run Jest Tests Coverage](#run-jest-tests-coverage)
  - [Run Jest End-to-End Tests](#run-jest-end-to-end-tests)

- [Getting Started: Important Information](#getting-started--important-information)
  - [Modules](#modules)
  - [Module Example Structure](#module-example-structure-explained)
  - [Providers](#providers)
  - [Custom Providers](#custom-providers)
  - [Config](#config)
  - [Migrations](#migrations)
  - [Decorators](#decorators)
  - [Custom Decorators](#custom-decorators)
  - [Pipes](#pipes)
  - [Interceptors](#interceptors)
  - [Guards](#guards)
  - [Middlewares](#middlewares)
  - [Tests](#tests)
  
## Getting Started: Commands

### Install NestJs CLI globally
`npm i -g @nestjs/cli`

### Output all Nest commands
`nest --help`

### Create an application
`nest new {application-name}`

### Start Nest application
`npm run start`

### Run application in development mode
`npm run start:dev`

### Generate a Controller
`nest generate controller {name}` or `nest g co {name}`

### Generate a Service
`nest generate service {name}` or `nest g s {name}`

### Generate a Module
`nest generate module {name}` or `nest g mo {name}`

### Generate a Guard
`nest g guard common/guards/{name}`

### Generate an Interceptor
`nest g interceptor common/interceptors/{name}`

### Generate a Pipe
`nest g pipe common/pipes/{name}`

### Generate a Middleware
`nest g middleware common/middleware/{name}`

### Install mapped-types (ex: For PartialType usage)
`npm i @nestjs/mapped-types`

### Start Docker containers in background mode
`docker-compose up -d`

### Stop Docker containers
`docker-compose down`

### Install TypeORM
`npm install @nestjs/typeorm typeorm pg`

### Create class (ex: Dto)
`nest g class {module}/dto/name.dto --no-spec`

### Create an entity
`nest g class {module}/entities/{name}.entity --no-spec`

### Create a TypeOrm Migration
`npx typeorm migration:create src/migrations/CoffeeRefactor`

### Running a Migration
1. `npm run build`
2. `npx typeorm migration:run -d dist/typeorm-cli.config` (config file has to be created previously)

### Revert a Migration
`npx typeorm migration:revert -d dist/typeorm-cli.config`

### Create Automatic TypeORM Migration
`npx typeorm migration:generate src/migrations/SchemaSync -d dist/typeorm-cli.config`

### Install NestJs config
`npm i @nestjs/config`

### Installing JOI for validations
`npm i @hapi/joi`
`npm i --save-dev @types/hapi__joi`

### Install Swagger
`npm i @nestjs/swagger swagger-ui-express`

### Install class-validator and class-transformer
`npm i class-validator class-transformer`

### Run Jest Unit tests
`npm run test`

### Run Jest Tests Coverage
`npm run test:cov`

### Run Jest End-to-End Tests
`npm run test:e2e`

## Getting Started: Important Information

### Modules
Modules in NestJS are classes annotated with the @Module() decorator, which provides metadata for organizing the application's structure.

NestJS applications come with a root module which serves as the starting point for building the application graph. The application graph is an internal data structure used by NestJS to resolve module and provider relationships and dependencies.

While small applications may only need a root module, creating different modules is strongly recommended as an effective way of organizing components. For most applications, the resulting architecture will involve multiple modules that encapsulate closely related sets of capabilities.

Using modules helps manage complexity and develop with SOLID principles, particularly as the size of the application and/or team grows.

Ex:
> "The CatsController and CatsService belong to the same application domain. As they are closely related, it makes sense to move them into a feature module. A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries."

Source: https://docs.nestjs.com/modules

### Module Example Structure Explained
```
import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';

@Module({
  imports: [], // Import any modules this module depends on
  // (can be left empty if there are no dependencies)
  controllers: [CatsController], // Declare any controllers belonging to this module
  providers: [CatsService], // Declare any services or providers belonging to this module
  exports: [CatsService], // Export any services or providers that should be available
  // for use by other modules or components outside of this module
})

export class CatsModule {}
```

### Providers
In NestJS, providers are classes that share functionality and resources by being injected into other classes. They can be services, helpers, or any other class providing functionality. The NestJS Dependency Injection system manages providers, allowing for easy swapping and greater modularity. Providers must be defined with the @Injectable() decorator and can be injected into other classes with the @Inject() decorator. Providers are a powerful tool for managing dependencies in a NestJS application.

### Custom Providers
(WIP)

### Config
Application configurations often vary depending on the environment they are deployed in. For example, database credentials for local development may differ from those used in production. To manage these differences, it is a best practice to store configuration settings in environment variables.

In Node.JS .env files holding key-value pairs are used to represent each environment. This way running an app in different environments is just a matter of swapping the correct .env file.

A good approach for using this technique in Nest is to create a ConfigModule that exposes a ConfigService which loads the appropriate .env file.

https://docs.nestjs.com/techniques/configuration

### Migrations
> "Migrations provide a way to incrementally update the database schema to keep it in sync with the application's data model while preserving existing data in the database. To generate, run, and revert migrations, TypeORM provides a dedicated CLI."

Source: https://docs.nestjs.com/techniques/database#typeorm-transactions

### Decorators
Decorators are special TypeScript annotations that can be applied to classes, methods, and properties. They are defined using an expression that returns a function, which allows you to add metadata or modify the behavior of the decorated element.

For example, you can use the @Controller decorator to mark a class as a controller, the @Get decorator to define a method as an HTTP GET endpoint, or the @Injectable decorator to mark a class as injectable.

### Custom Decorators
In order to make your code more readable you can create your own Decorators and reuse them across the code.

For example, this is a decorator for transforming empty DTO values to undefined:
```
import { Transform } from 'class-transformer';

export function EmptyToUndefined(): PropertyDecorator {
  return Transform((value) =>
    value.value === null || value.value === '' ? undefined : value.value,
  );
}
```

And this is an example on how it can be used:
```
import { EmptyToUndefined } from '../../../common/decorators/empty-to-undefined.decorator';

export class RatingResponseDto {
  readonly id: number;

  readonly rating: number;

  @EmptyToUndefined()
  readonly comments: string;
}
```

### Pipes
Pipes are classes annotated with the @Injectable() decorator which implements the PipeTransform interface. They typically have two use cases, one being transformation (ex: transforming input data) and the other one being validation (ex: validating input data and throwing an exception in case it's invalid).

### Interceptors
(WIP)

### Guards
(WIP)

### Middlewares
(WIP)

### Tests
(WIP)
