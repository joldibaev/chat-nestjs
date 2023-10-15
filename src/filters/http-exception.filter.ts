import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly exceptionMessages = {
    401: 'Invalid credentials',
  };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const statusCode = exception.getStatus();
    const { error, message } = this.getMessages(exception);
    const timestamp = new Date().toISOString();
    const path = request.url;

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      timestamp,
      path,
    });
  }

  private getMessages(exception: HttpException) {
    const exceptionResponse: Object = exception.getResponse();
    const status = exception.getStatus();

    if ('error' in exceptionResponse) {
      return {
        error: String(exceptionResponse.error),
        message: exception.message,
      };
    }

    return {
      error: exception.message,
      message: this.exceptionMessages[status],
    };
  }
}
