import { toInt } from 'ch4/ex4/toInt.js';

export const toIntAsync = (s: string): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const result = toInt(s);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
