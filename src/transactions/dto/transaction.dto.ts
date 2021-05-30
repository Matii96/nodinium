import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsPositive } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class TransactionDto {
  @ApiProperty({ example: uuidv4() })
  @IsUUID()
  sender: string;

  @ApiProperty({ example: uuidv4() })
  @IsUUID()
  receiver: string;

  @ApiProperty({ example: 1 })
  @IsPositive()
  amount: number;

  @ApiProperty()
  timestamp: Date;
}
