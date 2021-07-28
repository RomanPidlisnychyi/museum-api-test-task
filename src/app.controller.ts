import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({})
  @ApiBadRequestResponse({ description: 'get error' })
  @HttpCode(HttpStatus.OK)
  async getHello(): Promise<void> {
    await this.appService.getHello();
  }
}
