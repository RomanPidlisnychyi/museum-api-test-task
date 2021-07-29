import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { COLOR_TYPES } from '../../enums';

export class MainResponse {
  @ApiProperty({ example: 436297 })
  @IsNumber()
  objectID: number;

  @ApiProperty({ example: 'https://images.metmuseum.org/CRDImages/ep/web-large/DP265190.jpg' })
  @IsString()
  primaryImageSmall: string;

  @ApiProperty({ example: 'rgb(38,50,24)' })
  @IsString()
  dominantColor: string;

  @ApiProperty({ enum: COLOR_TYPES, example: COLOR_TYPES[1] })
  @IsEnum(COLOR_TYPES)
  dominantPrimaryColor: COLOR_TYPES;
}
