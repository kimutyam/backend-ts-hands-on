import { toInt } from 'ch4/ex4112/toInt.js';

const toIntAsync = (s: string): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const result = toInt(s);
      resolve(result);
    } catch (error) {
      if (error instanceof Error) {
        reject(error);
      } else {
        reject(new Error(String(error)));
      }
    }
  });

export { toIntAsync };
