import { IsOptional, IsString, IsNumber, IsBoolean, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCourseDto {

  @IsString()
  id: string

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  hours?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsOptional()
  @IsString()
  instructorId?: string;

  
}
