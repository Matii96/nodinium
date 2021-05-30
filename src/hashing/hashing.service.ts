import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cpus } from 'os';
import { join } from 'path';
import { Worker } from 'worker_threads';
import { EventEmitter } from 'events';
import { createHash } from 'crypto';
import { Block } from 'src/blockchain/block';
import { WorkerCommand } from './worker-command';

@Injectable()
export class HashingService {
  private workers: Worker[];
  private workReceivers: { [id: string]: (result: any) => any };

  public constructor(private readonly config: ConfigService) {
    this.initWorkers();
    this.workReceivers = {};
  }

  private initWorkers(): void {
    this.workers = [];
    let workersCount = parseInt(this.config.get<string>('WORKER_THREADS'));
    if (!(workersCount > 0)) {
      workersCount = cpus().length;
    }
    EventEmitter.defaultMaxListeners = workersCount * 2;
    for (let i = 0; i < workersCount; i++) {
      const worker = new Worker(join(__dirname, 'worker.js'));
      worker.on('message', this.handleMessage.bind(this));
      this.workers.push(worker);
    }
  }

  private handleMessage(message: WorkerCommand<any>) {
    if (!this.workReceivers[message.id]) return;

    this.workReceivers[message.id](message.data);
    delete this.workReceivers[message.id];
    const abordWork = new WorkerCommand<string>('abord', message.id);
    this.workers.forEach((worker) => worker.postMessage(abordWork));
  }

  /**
   *
   * @param {Block} block
   * @returns {Promise<number>} Found nonce
   */
  public mineBlock(block: Block) {
    return new Promise<number>((resolve) => {
      const command = new WorkerCommand<Block>('find-nonce', block);
      this.workReceivers[command.id] = resolve;
      this.workers.forEach((worker) => worker.postMessage(command));
    });
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
