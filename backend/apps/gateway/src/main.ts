import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Criar app HTTP
  const app = await NestFactory.create(GatewayModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3333',
    credentials: true,
  });

  await app.listen(process.env.port ?? 3000);
  const logger = new Logger('GatewayBootstrap');
  logger.log('Gateway is running on http://localhost:3000');
}
void bootstrap();
