import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get('status')
  check() {
    return { status: 'ok' };
  }
}
