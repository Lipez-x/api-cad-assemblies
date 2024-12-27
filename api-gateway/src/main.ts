import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Documentação Cad Assemblies')
    .setDescription(
      'O Cad Assemblies foi idealizado com o intuito de gerenciar membros, departamentos e congregações de igrejas, facilitando um processo que na maioria das igrejas ainda é feito de forma manual.',
    )
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(8080);
}
bootstrap();
