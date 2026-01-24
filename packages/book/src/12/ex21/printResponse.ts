import { Logger } from './logger.js';
import { Request } from './request.js';

type PrintResponse = (
  startDecoration: string,
  endDecoration: string,
) => Promise<void>;

// 1
const create =
  (request: Request, logger: Logger): PrintResponse =>
  async (startDecoration, endDecoration) => {
    const response = await request();
    const result = await response.text();
    logger.log(startDecoration);
    logger.log(result);
    logger.log(endDecoration);
  };

// 2
create.inject = [Request.token, Logger.token] as const;

const PrintResponse = {
  token: 'PrintResponse',
  create,
} as const;

export { PrintResponse };
