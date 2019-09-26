import { Injectable } from '@nestjs/common';
import { BootValue } from '@nestcloud/boot';

@Injectable()
export class ExtraService {
  @BootValue('icp')
  private readonly icp;
  @BootValue('service.externalUrl')
  private readonly url;

  getICP() {
    return this.icp;
  }

  getUrl() {
    return this.url;
  }
}
