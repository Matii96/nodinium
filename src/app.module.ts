import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashingModule } from './hashing/hashing.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['env/default.env'],
    }),
    HashingModule,
    BlockchainModule,
    TransactionsModule,
  ],
})
export class AppModule {}
