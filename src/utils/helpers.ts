export const generateId = (prefix: string = "iob"): string => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const clamp = (val: number, min: number, max: number): number => {
  return Math.min(Math.max(val, min), max);
};
