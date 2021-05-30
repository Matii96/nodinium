import { Module } from '@nestjs/common';
import { HashingModule } from 'src/hashing/hashing.module';
import { BlockchainRepository } from './blockchain.repository';
import { BlockchainService } from './blockchain.service';

@Module({
  imports: [HashingModule],
  providers: [BlockchainService, BlockchainRepository],
  exports: [BlockchainService],
})
export class BlockchainModule {}
