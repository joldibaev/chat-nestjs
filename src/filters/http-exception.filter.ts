import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly EXCEPTION_MESSAGES = {
    401: 'Invalid credentials',
  };

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error = exception.message;
    const statusCode = exception.getStatus();
    const message = this.getExceptionMessage(exception);

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getExceptionMessage(exception: HttpException): string | undefined {
    const exceptionResponse: Object = exception.getResponse();
    const status = exception.getStatus();

    if ('error' in exceptionResponse) {
      return String(exceptionResponse.error);
    }

    return this.EXCEPTION_MESSAGES[status];
  }
}
