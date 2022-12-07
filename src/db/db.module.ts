import { Module } from '@nestjs/common';

import { pgProvider } from './pgProvider';

@Module({
  providers: [pgProvider],
  exports: [pgProvider],
})
export class DbModule {}
