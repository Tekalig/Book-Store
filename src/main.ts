import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000).catch((err) => {
    console.error('Error starting the server:', err);
  });
}
void bootstrap();
