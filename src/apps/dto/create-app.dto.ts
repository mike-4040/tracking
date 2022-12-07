import { Length } from 'class-validator';
import { Transform } from 'class-transformer';

import { SETTINGS } from '../constants';
import { trimTransformer } from '../../transform/transformers';

export class CreateAppDto {
  @Transform(trimTransformer)
  @Length(1, SETTINGS.maxAppNameLength, {
    message:
      'Application name must be between $constraint1 and $constraint2 characters',
  })
  name: string;
}
