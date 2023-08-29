import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './common/modules';

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundFilter, UnauthorizedFilter } from './common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new NotFoundFilter());
  app.useGlobalFilters(new UnauthorizedFilter());

  await setupSwagger(app);

  const port = parseInt(process.env.WEB_PORT) || 5000;
  await app.listen(port);
}
bootstrap();
