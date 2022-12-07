import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  controllers: [OrgsController],
  providers: [OrgsService],
})
export class OrgsModule {}
