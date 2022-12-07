import { camelCase } from 'camel-case';

export const objectToCamelCase = <T extends Record<string, any>>(obj: any): T =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => Object.assign(acc, { [camelCase(key)]: value }),
    {} as T,
  );
