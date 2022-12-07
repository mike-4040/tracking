import { Length } from 'class-validator';
import { SETTINGS } from '../constants';
import { Transform } from 'class-transformer';

import { trimTransformer } from '../../transform/transformers';

export class CreateOrgDto {
  @Transform(trimTransformer)
  @Length(1, SETTINGS.maxOrgNameLength, {
    message:
      'Organization name must be between $constraint1 and $constraint2 characters',
  })
  name: string;
}
