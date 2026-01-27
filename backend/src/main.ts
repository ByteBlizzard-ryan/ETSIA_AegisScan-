import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);

 
//Pour autoriser le backend a communiquer avec le frontend utilise sur le port 5173
  app.enableCors({
    origin: 'http://localhost:5173', // frontend Vite
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
