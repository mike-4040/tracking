export const SETTINGS = {
  secretEnvVar: 'AUTH_SECRET',
  expiresIn: '1d',
  saltLength: 16,
  hashLength: 64,
  passwordOptions: {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  },
} as const;
