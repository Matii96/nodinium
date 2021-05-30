import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cpus } from 'os';
import { join } from 'path';
import { Worker } from 'worker_threads';
import { EventEmitter } from 'events';
import { createHash } from 'crypto';
import { Block } from 'src/blockchain/block';

@Injectable()
export class HashingService {
  private workers: Worker[];

  public constructor(private readonly config: ConfigService) {
    this.initWorkers();
    EventEmitter.defaultMaxListeners = 30;
  }

  private initWorkers(): void {
    this.workers = [];
    const workersCount = this.config.get<number>('WORKER_THREADS') || cpus().length;
    for (let i = 0; i < workersCount; i++) {
      this.workers.push(new Worker(join(__dirname, 'worker.js')));
    }
  }

  /**
   *
   * @param {Block} block
   * @returns {number} Found nonce
   */
  public mineBlock(block: Block): number {
    // TODO
    return 5;
  }

  /**
   *
   * @param {Block} block
   * @returns {string}
   */
  public getHash(block: Block): string {
    // TODO
    const hashFunction = createHash('sha256');
    hashFunction.update(block.toString());
    return hashFunction.digest('hex');
  }
}
