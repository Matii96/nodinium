import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  public constructor(
    private readonly transactionsService: TransactionsService,
  ) {}

  @Post()
  @ApiBody({ type: TransactionDto })
  @ApiCreatedResponse()
  public CreateUser(@Body() data: TransactionDto) {
    return this.transactionsService.create(data);
  }
}
