import { TransactionDto } from 'src/transactions/dto/transaction.dto';

export class Block {
  public constructor(
    public previousBlockHash: string,
    public transactions: TransactionDto[],
    public timestamp: number = Date.now(),
    public nonce: number = 0,
  ) {}

  public toString(): string {
    return `${this.previousBlockHash}-${JSON.stringify(this.transactions)}-${this.nonce}-${this.timestamp}`;
  }
}
