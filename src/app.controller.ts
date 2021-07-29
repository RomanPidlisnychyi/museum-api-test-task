import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { MainRequest, preparingCorrectEnumRequest, MainResponse } from './common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('getTransformedApiResponse')
  @ApiResponse({ type: MainResponse, isArray: true })
  @ApiBadRequestResponse({ description: 'getTransformedApiResponse error' })
  @HttpCode(HttpStatus.OK)
  async getTransformedApiResponse(@Body() dto: MainRequest): Promise<MainResponse[]> {
    const preparedRequest = preparingCorrectEnumRequest(dto);
    return this.appService.getTransformedApiResponse(preparedRequest);
  }
}
