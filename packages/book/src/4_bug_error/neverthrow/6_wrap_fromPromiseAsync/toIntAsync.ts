import { toInt } from '../4_wrap_fromThrowable/toInt';

export const toIntAsync = (s: string): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const result = toInt(s);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
