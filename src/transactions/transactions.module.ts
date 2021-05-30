import { Module } from '@nestjs/common';
import { BlockchainModule } from 'src/blockchain/blockchain.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [BlockchainModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
