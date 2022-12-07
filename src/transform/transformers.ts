export const trimTransformer = ({ value }: { value: string }) => {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value.trim();
};

export const lowerCaseTransformer = ({ value }: { value: string }) => {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value.toLowerCase();
};

export const lowerCaseTrimTransformer = ({ value }: { value: string }) => {
  if (typeof value !== 'string') {
    throw new Error('Value is not a string');
  }
  return value.trim().toLowerCase();
};
