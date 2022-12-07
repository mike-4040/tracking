import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

import { IsStrongPassword } from '../../validation/is-strong-password';
import { lowerCaseTrimTransformer } from '../../transform/transformers';

export class CreateUserDto {
  @Transform(lowerCaseTrimTransformer)
  @IsEmail({ allow_utf8_local_part: false }, { message: 'Invalid email' })
  email: string;

  @IsStrongPassword({ message: 'Password is not strong enough' })
  password: string;
}
