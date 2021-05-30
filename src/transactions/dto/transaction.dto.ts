import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty()
  sender: string;

  @ApiProperty()
  receiver: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  timestamp: Date;
}
