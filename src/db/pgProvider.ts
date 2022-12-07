import { ConfigService } from '@nestjs/config';
import { FactoryProvider } from '@nestjs/common';
import { Pool } from 'pg';

import { PG_CONNECTION } from '../constants';
import { PG_ENV_KEYS } from './constants';

const getPool = (configService: ConfigService): Pool =>
  new Pool({
    user: configService.getOrThrow<string>(PG_ENV_KEYS.user),
    host: configService.getOrThrow<string>(PG_ENV_KEYS.host),
    database: configService.getOrThrow<string>(PG_ENV_KEYS.database),
    password: configService.getOrThrow<string>(PG_ENV_KEYS.password),
    port: configService.getOrThrow<number>(PG_ENV_KEYS.port),
  });

export const pgProvider: FactoryProvider<Pool> = {
  provide: PG_CONNECTION,
  useFactory: (configService: ConfigService) => getPool(configService),
  inject: [ConfigService],
};
