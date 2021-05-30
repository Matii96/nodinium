import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HashingService } from 'src/hashing/hashing.service';
import { TransactionDto } from 'src/transactions/dto/transaction.dto';
import { BlockchainRepository } from './blockchain.repository';
import { Block } from './block';

@Injectable()
export class BlockchainService {
  private cachedTransactions: TransactionDto[];
  private bussy: boolean;

  public constructor(
    private readonly config: ConfigService,
    private readonly hashingService: HashingService,
    private readonly blockchainRepository: BlockchainRepository,
  ) {
    this.cachedTransactions = [];
    this.bussy = false;
  }

  public async appendTransaction(transaction: TransactionDto) {
    this.cachedTransactions.push(transaction);
    if (this.bussy) return;

    const transactionsPerBlock = this.config.get<number>('TRANSACTIONS_PER_BLOCK');
    while (this.cachedTransactions.length >= transactionsPerBlock) {
      this.bussy = true;
      const lastBlock = this.blockchainRepository.findLast();
      const newBlock = new Block(
        this.hashingService.getHash(lastBlock),
        this.cachedTransactions.slice(-transactionsPerBlock),
      );
      this.cachedTransactions = this.cachedTransactions.slice(0, -transactionsPerBlock);
      newBlock.nonce = await this.hashingService.mineBlock(newBlock);
      this.blockchainRepository.create(newBlock);

      console.log('newBlock:', newBlock);
    }
    this.bussy = false;
  }

  public validate(): boolean {
    return true;
  }
}
