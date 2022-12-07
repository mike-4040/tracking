import { IsInt, Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { LocationBase } from '../types';
import { SETTINGS } from '../constants';
import { trimTransformer } from '../../transform/transformers';

export class CreateLocationDto
  implements Omit<LocationBase, 'locationId' | 'orgId'>
{
  @Transform(trimTransformer)
  @Length(1, SETTINGS.maxLocationNameLength, {
    message:
      'Location name must be between $constraint1 and $constraint2 characters',
  })
  name: string;

  // will be set by the controller
  orgId?: number;

  @IsInt()
  appId: number;
}
