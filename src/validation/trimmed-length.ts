import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * Not in use, kept as an example of how to create a custom validator
 */
export function TrimmedLength(
  min: number,
  max: number,
  options?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [min, max],
      validator: Constraint,
    });
  };
}

@ValidatorConstraint()
class Constraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [min, max] = args.constraints;

    if (typeof value !== 'string') {
      return false;
    }

    const trimmedLength = value.trim().length;
    return trimmedLength >= min && trimmedLength <= max;
  }
}
