import { Logger } from './logger.js';
import { Request } from './request.js';

type PrintResponse = (
  startDecoration: string,
  endDecoration: string,
) => Promise<void>;

const create =
  (request: Request, logger: Logger): PrintResponse =>
  async (startDecoration, endDecoration) => {
    const response = await request();
    const result = await response.text();
    logger.log(startDecoration);
    logger.log(result);
    logger.log(endDecoration);
  };

create.inject = [Request.token, Logger.token] as const;

const PrintResponse = {
  token: 'PrintResponse' as const,
  create,
} as const;

export { PrintResponse };
