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

    const error = exception.message;
    const statusCode = exception.getStatus();
    const message = this.getExceptionMessage(exception);
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

  private getExceptionMessage(exception: HttpException): string | undefined {
    const exceptionResponse: Object = exception.getResponse();
    const status = exception.getStatus();

    if ('error' in exceptionResponse) {
      return String(exceptionResponse.error);
    }

    return this.exceptionMessages[status];
  }
}
