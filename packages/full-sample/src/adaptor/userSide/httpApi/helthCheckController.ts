import { constants } from 'http2';
import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get()
  @HttpCode(constants.HTTP_STATUS_OK)
  async index(): Promise<string> {
    return Promise.resolve('ok');
  }
}
