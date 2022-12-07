import { Module } from '@nestjs/common';

import { AppsController } from './apps.controller';
import { AppsService } from './apps.service';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [AppsController],
  providers: [AppsService],
  exports: [AppsService],
})
export class AppsModule {}
