import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppsModule } from './apps/apps.module';
import { AuthModule } from './auth/auth.module';
import { BarcodesController } from './barcodes/barcodes.controller';
import { BarcodesService } from './barcodes/barcodes.service';
import { DbModule } from './db/db.module';
import { HealthController } from './health/health.controller';
import { LocationsModule } from './locations/locations.module';
import { OrgsModule } from './orgs/orgs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DbModule,
    UsersModule,
    OrgsModule,
    AppsModule,
    LocationsModule,
  ],
  controllers: [AppController, HealthController, BarcodesController],
  providers: [AppService, BarcodesService],
})
export class AppModule {}
