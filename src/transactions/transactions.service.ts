import { Injectable } from '@nestjs/common';
import { BlockchainService } from 'src/blockchain/blockchain.service';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionsService {
  public constructor(private readonly blockchainService: BlockchainService) {}

  public create(data: TransactionDto) {
    // Make sure sender has that amount of money
    // TODO

    this.blockchainService.appendTransaction(data);
  }
}
