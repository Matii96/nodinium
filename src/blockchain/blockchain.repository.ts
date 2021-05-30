import { Injectable } from '@nestjs/common';
import { Block } from './block';

@Injectable()
export class BlockchainRepository {
  private blocks: Block[];

  public constructor() {
    this.blocks = [];
  }

  public findById(id: number) {
    return this.blocks[id];
  }

  public findLast() {
    return this.blocks[this.blocks.length - 1];
  }

  public findAll() {
    return this.blocks;
  }

  public create(block: Block) {
    this.blocks.push(block);
  }
}
