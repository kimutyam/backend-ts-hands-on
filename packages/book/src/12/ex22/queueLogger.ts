import type { Disposable } from 'typed-inject';

import type { Logger } from './logger.js';

class QueueLogger implements Logger, Disposable {
  private queue: Array<string> = [];

  /* global NodeJS */
  private interval: NodeJS.Timeout;

  constructor() {
    // 1
    this.interval = setInterval(() => {
      this.flush();
    }, 100);
  }

  // 2
  private flush(): void {
    if (this.queue.length > 0) {
      const logLines = this.queue.join('\n');
      console.log(logLines);
      this.queue = [];
    }
  }

  // 3
  log(message: string): void {
    this.queue.push(message);
  }

  // 4
  dispose(): void {
    clearInterval(this.interval);
    this.flush();
  }
}

export { QueueLogger };
