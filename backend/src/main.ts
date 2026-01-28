import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173', 
  });

  // CONFIGURATION AMÉLIORÉE
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,         // Ignore les données envoyées qui ne sont pas dans le DTO (sécurité)
    forbidNonWhitelisted: true, // Rejette la requête si des données inconnues sont présentes
    transform: true,         // Transforme les types (ex: string en number si besoin)
  }));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend running on: http://localhost:3000`);
}
bootstrap();