import { Module } from '@nestjs/common';

import { AppsService } from '../apps/apps.service';
import { DbModule } from '../db/db.module';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [DbModule],
  controllers: [LocationsController],
  providers: [LocationsService, AppsService],
})
export class LocationsModule {}
