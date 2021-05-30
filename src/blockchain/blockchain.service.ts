import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashingService } from 'src/hashing/hashing.service';
import { TransactionDto } from 'src/transactions/dto/transaction.dto';
import { BlockchainRepository } from './blockchain.repository';
import { Block } from './block';

@Injectable()
export class BlockchainService {
  private cachedTransactions: TransactionDto[];

  public constructor(
    private readonly config: ConfigService,
    private readonly hashingService: HashingService,
    private readonly blockchainRepository: BlockchainRepository,
  ) {
    this.cachedTransactions = [];
  }

  public appendTransaction(transaction: TransactionDto): void {
    this.cachedTransactions.push(transaction);

    if (this.cachedTransactions.length < this.config.get<number>('TRANSACTIONS_PER_BLOCK')) return;

    const lastBlock = this.blockchainRepository.findLast();
    const newBlock = new Block(this.hashingService.getHash(lastBlock), this.cachedTransactions);
    this.cachedTransactions = [];
    newBlock.nonce = this.hashingService.mineBlock(newBlock);
    this.blockchainRepository.create(newBlock);
  }

  public validate(): boolean {
    return true;
  }
}
