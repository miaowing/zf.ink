import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { registerPartials, registerHelper } from 'hbs';
import moment = require('moment');
import { getPartialsPath, getPublicPath, getViewPath } from './utils/PathUtil';

registerPartials(getPartialsPath());
registerHelper('dateFmt', date => {
  return moment(date).format('YYYY-MM-DD');
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');
  app.useStaticAssets(getPublicPath(), { prefix: '/assets', maxAge: 3600000 * 356 });
  app.setBaseViewsDir(getViewPath());
  await app.listen(3000);
}

bootstrap();
