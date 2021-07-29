import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { QUANTITY, API_DEPARTMENT_ID } from '../../enums';

export class MainRequest {
  @ApiProperty({ enum: QUANTITY, example: QUANTITY[20] })
  @IsEnum(QUANTITY, { each: true })
  quantityObjectsInResponse: QUANTITY;

  @ApiProperty({
    example: API_DEPARTMENT_ID[11],
    enum: API_DEPARTMENT_ID,
  })
  @IsEnum(API_DEPARTMENT_ID, { each: true })
  department: API_DEPARTMENT_ID;
}
