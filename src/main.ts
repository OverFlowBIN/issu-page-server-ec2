import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './utill/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* init swagger */
  setupSwagger(app);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap().catch(console.error);
