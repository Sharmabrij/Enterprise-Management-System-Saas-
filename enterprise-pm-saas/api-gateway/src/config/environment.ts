export const getEnv = (key: string, defaultValue?: string): string | undefined => {
  return process.env[key] || defaultValue;
}; 