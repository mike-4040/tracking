import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import validator from 'validator';

import { SETTINGS } from '../auth/constants';

export function IsStrongPassword(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: undefined,
      validator: Constraint,
    });
  };
}

@ValidatorConstraint()
class Constraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return (
      typeof value === 'string' &&
      validator.isStrongPassword(value, SETTINGS.passwordOptions)
    );
  }
}
