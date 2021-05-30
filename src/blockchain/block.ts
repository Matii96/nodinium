import { TransactionDto } from 'src/transactions/dto/transaction.dto';

export class Block {
  public constructor(
    public previousBlockHash: string,
    public transactions: TransactionDto[],
    public timestamp: number = Date.now(),
    public nonce: number = 0,
  ) {}
}
