import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    required: false,
    default: 10,
    description: 'Number of items to display',
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    required: false,
    default: 1,
    description: 'Number of the page',
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset?: number;
}
