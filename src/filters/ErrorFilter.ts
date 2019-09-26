import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Catch()
class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let message = exception.message || 'Internal Server Error';
    if (typeof exception.message !== 'string') {
      message = exception.message.message;
    }
    response.render('error', { message });
  }
}

export const ErrorFilterProvider = {
  provide: APP_FILTER,
  useClass: ErrorFilter,
};
