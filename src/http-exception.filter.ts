import { ExceptionFilter, Catch, HttpException, Logger, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   *
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   */
  catch(exception: HttpException, host: ArgumentsHost): void {
    // Extract gql body query / mutation
    const ctx = host.switchToHttp();
    const gqlQuery: string = ctx.getNext()?.req?.body?.query;

    // Format log
    const data = { status: exception.getStatus(), message: (<{ message: string }>exception.getResponse()).message };
    const logger = new Logger('HttpException');
    let msg = `${data.status} ${data.message}`;

    if (gqlQuery) {
      msg += ` ${gqlQuery}`;
    } else {
      // Send response manually in case of simple http request
      const response = ctx.getResponse<Response>();
      response.status(data.status).send(data);
    }
    logger.warn(msg);
  }
}
