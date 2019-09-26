import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import * as services from './services';
import * as filters from './filters';
import { components } from '@nestcloud/common';
import { BootModule } from '@nestcloud/boot';
import { getConfigPath } from './utils/PathUtil';

@Module({
  imports: [
    BootModule.register(getConfigPath(), 'config.yaml'),
  ],
  controllers: components(controllers),
  providers: components(services, filters),
})
export class AppModule {
}
