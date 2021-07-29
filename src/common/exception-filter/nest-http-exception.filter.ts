import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { CoreApiResponse, Code } from '../';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: any, host: ArgumentsHost): void {
    const response: Response = host.switchToHttp().getResponse<Response>();

    let errorResponse: CoreApiResponse<unknown> = CoreApiResponse.error(
      error.code || Code.INTERNAL_ERROR.code,
      error.message,
    );

    errorResponse = this.handleException(error, errorResponse);
    response.status(errorResponse.code).json(errorResponse);
  }

  private handleException(error: any, errorResponse: CoreApiResponse<unknown>): CoreApiResponse<unknown> {
    if (error.response) {
      return CoreApiResponse.error(error.status, error.message, null);
    }

    if (error.parent?.code && error.parent?.detail) {
      return CoreApiResponse.error(Code.BAD_REQUEST_ERROR.code, error.parent.detail, null);
    }

    return errorResponse;
  }
}
