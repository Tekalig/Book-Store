# Copilot Instructions for Book-Store Project

- This project uses **NestJS** and **TypeScript**.
- Follow NestJS conventions: use modules, controllers, services, DTOs, and dependency injection.
- Use TypeScript best practices: strong typing, interfaces, async/await, and clear function signatures.
- Organize code according to the standard NestJS project structure.
- Prefer idiomatic NestJS patterns for error handling, validation, and routing.
- Write clean, maintainable, and well-documented code.

---

## 5 Best Practices for NestJS Applications (from Medium)

1. **Modularize your application**: Organize your code into separate modules, each with a specific responsibility. This makes it easier to maintain, test, and reuse code.
2. **Use Dependency Injection**: Leverage NestJS’s built-in Dependency Injection system to manage dependencies between modules and services, making your code more flexible and testable.
3. **Implement Error Handling and Logging**: Use exception filters and pipes to handle errors and exceptions, and integrate logging mechanisms to monitor and debug your application.
4. **Follow a Consistent Coding Style**: Enforce a consistent coding style throughout your application using tools like ESLint and Prettier.
5. **Write Comprehensive Tests**: Use Jest or Mocha to write unit tests, integration tests, and end-to-end tests for your application, ensuring your code is reliable, stable, and works as expected.

### Details:

#### 1. Modularize your application

- Break down your application into smaller, independent modules, each with a specific responsibility.
- Benefits: easier maintenance, improved reusability, faster development, better testing.

#### 2. Use Dependency Injection

- Use interfaces and abstract classes to decouple services from implementations.
- Benefits: loose coupling, testability, reusability, flexibility.

#### 3. Implement Error Handling and Logging

- Use built-in mechanisms like `HttpException` and the `Logger` service.
- Benefits: improved reliability, faster debugging, enhanced security, better user experience.

#### 4. Follow a Consistent Coding Style

- Use consistent indentation, spacing, and naming conventions (PascalCase for classes, camelCase for variables).
- Tools: ESLint, Prettier.
- Benefits: improved readability, faster development, better maintainability, reduced errors.

#### 5. Write Comprehensive Tests

- Write unit, integration, and end-to-end tests using Jest or Mocha.
- Benefits: improved reliability, faster debugging, better maintainability, enhanced confidence.

---

_Source: [5 best practices for NestJS applications](https://medium.com/deno-the-complete-reference/5-best-practices-for-nestjs-applications-831d0566a534)_

---

## Best NestJS Practices and Advanced Techniques (from DEV.to)

1. **Setting Up a NestJS Project**: Use the Nest CLI to scaffold new projects and maintain a clean project structure.
2. **Modular Architecture**: Encapsulate related components in modules and use services for business logic.
3. **Dependency Injection and Providers**: Use providers for dependency injection to manage component dependencies and promote loose coupling.
4. **Controllers and Routing**: Define clear routes and request handling in controllers.
5. **Data Validation and DTOs**: Use Data Transfer Objects (DTOs) for validating and typing incoming data.
6. **Error Handling and Logging**: Implement global exception filters and use logging for debugging and monitoring.
7. **Authentication and Authorization**: Use guards and strategies to secure endpoints and manage access control.
8. **Testing with Jest**: Write unit and integration tests for services and controllers using Jest.
9. **Performance Optimization**: Implement caching and other optimizations to improve speed and scalability.
10. **Deployment and Continuous Integration**: Use Docker, Docker Compose, and CI/CD pipelines for reliable deployment and automation.
11. **Configuration Management**: Utilize `@nestjs/config` for managing environment variables and application settings securely and efficiently.
12. **Effective Database Interaction**: Employ an ORM like Prisma or TypeORM, and consider patterns like the Repository pattern for clean and maintainable database operations.

### Details:

- **Use the Nest CLI** for project setup and scaffolding.
- **Structure code into modules and services** for maintainability.
- **Leverage dependency injection** for flexible and testable code.
- **Validate data with DTOs** and use TypeScript for type safety.
- **Implement global error handling** and use the built-in Logger.
- **Secure endpoints** with guards and authentication strategies.
- **Write comprehensive tests** using Jest for all layers.
- **Optimize performance** with caching (e.g., cache-manager, @nestjs/cache).
- **Automate deployment** with Docker and CI/CD tools (e.g., GitLab CI, Jenkins).
- **Manage configuration** effectively using `@nestjs/config` and environment variables.
- **Interact with databases** using ORMs (e.g., Prisma, TypeORM) and established patterns for data access layers.

---

_Source: [Best NestJS Practices and Advanced Techniques](https://dev.to/drbenzene/best-nestjs-practices-and-advanced-techniques-9m0)_

---

# NestJS Modules

In NestJS, a module is a collection of related functions and services that share a specific context. They provide a way to organize and structure applications, making the application structure clearer, easier to maintain and expand.

Modules can be created and used with the following steps:

**Create a new module:**
Use the Nest CLI to create a new module:

```
nest g module <module-name>
```

For example:

```
nest g module users
```

A new module called "users" will be created.

**Configuration module:**
In the new module folder, open the module file (usually `<module-name>.module.ts`) and configure the module:

```typescript
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

**Import module:**
To use the newly created module, import it into the main module (usually `app.module.ts`):

```typescript
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

**Use services from modules:**
Inject services in controllers:

```typescript
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}
```

Modules provide a way to organize and structure applications, making them clearer, easier to maintain, and extend.

---

### Microservice Communication using gRPC in NestJS

NestJS provides the official `@nestjs/microservices` module for microservice communication, supporting protocols like gRPC. Configure the gRPC server and client using the `GrpcOptions` object. Create a gRPC service with the `@GrpcMethod` decorator and use the `@Client` decorator to create gRPC clients and call service methods.

---

### Implementing Cache in NestJS

NestJS provides the official `@nestjs/cache` module for caching, supporting memory, Redis, Memcached, and more. Import `CacheModule` and use the `@InjectCache()` decorator to inject the cache service. Use its methods to set, get, and delete cached data.

---

### Logging in NestJS

Use the `Logger` class from `@nestjs/common` for logging. The Logger supports log levels: log, error, warn, debug, verbose, etc. You can also use logging interceptors from `@nestjs/common` to log all requests and responses.

---

### Asynchronous Tasks in NestJS

Use the official `@nestjs/schedule` module for async tasks. It supports scheduled, delayed, and cyclic tasks. Use the `@Cron` decorator for cron jobs, and `scheduleJob`, `setTimeout`, and `setInterval` for delayed and recurring tasks.

---

### Async Modules in NestJS

An async module is a module that can be loaded asynchronously, useful for resolving circular dependencies or dynamic loading. Create async modules with an async factory function and use `forwardRef` in the imports array to avoid circular dependency issues.

---

### ACL for Authorization Management in NestJS

Access Control List (ACL) allows you to define rules for user access to resources/actions.

Steps:

1. Install `@nestjs/passport` and `@nestjs/jwt`.
2. Create an `AuthModule` for authentication/authorization.
3. Define an `AuthGuard` class extending `CanActivate` and override `canActivate` for ACL rules.
4. Add `AuthGuard` to controller methods/routes needing authorization.
5. Use `@UseGuards()` to apply `AuthGuard`.

---

### High-Performance Caching with Redis in NestJS

1. Install the `nestjs-redis` package.
2. Create a `CacheModule` for caching.
3. Define a `CacheService` using `nestjs-redis` to connect to Redis and perform caching operations.
4. Use `CacheService` in controllers/routes to cache frequently accessed data.

---

### NestJS Bull (Job Queues)

NestJS Bull uses subprocesses to run jobs in a separate Node.js process (process isolation/forking). Jobs are serialized and sent to a child process using Node.js `child_process.fork()`. The child process executes the job and notifies the main process upon completion.

- Use subprocesses for computationally intensive or time-consuming tasks to leverage multi-core processors and improve performance.
- The number of child processes depends on server hardware, OS, and other processes. Adjust based on your needs and monitor memory/CPU usage to avoid resource exhaustion.

---

# TypeScript Best Practices

- Use strong typing and interfaces for all function signatures and object shapes.
- Prefer `const` and `let` over `var`.
- Use async/await for asynchronous code.
- Always enable strict mode in `tsconfig.json`.
- Use PascalCase for class and interface names, camelCase for variables and functions.
- Avoid using `any` type; use unknown or proper types instead.
- Use explicit return types for functions and methods.
- Organize imports: external modules first, then internal modules, then styles/assets.
- Document public classes, methods, and interfaces with JSDoc comments.
- Use type aliases and union types for flexible type definitions:
  ```typescript
  type Status = 'success' | 'error' | 'pending';
  ```
- Prefer enums or literal types for fixed sets of values:
  ```typescript
  enum Direction {
    Up,
    Down,
    Left,
    Right,
  }
  ```
- Use `readonly` for immutable properties and arrays:
  ```typescript
  readonly name: string;
  const arr: readonly number[] = [1, 2, 3];
  ```
- Use type guards and type assertions carefully to ensure type safety.
- Prefer `never` for functions that never return:
  ```typescript
  function throwError(message: string): never {
    throw new Error(message);
  }
  ```
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe property access:
  ```typescript
  const value = obj?.property ?? 'default';
  ```
- Prefer utility types like `Record`, `Partial`, `Pick`, and `Omit` for object manipulation:
  ```typescript
  type User = { id: number; name: string; };
  type UserPreview = Pick<User, 'name'>;
  ```
- Use namespaces only for legacy code; prefer ES6 modules (import/export) for new code.
- Avoid non-null assertions (`!`) unless absolutely necessary.
- Use strict null checks and always initialize variables.

---
