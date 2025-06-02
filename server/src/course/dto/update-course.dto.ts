import { IsOptional, IsString, IsNumber, IsBoolean, IsPositive } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateCourseDto {

  @IsString()
  id: string

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @Type(() => Number)
  price: number;

  
  @IsNumber()
  @Type(() => Number)
  hours: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsBoolean()
  @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    isActive: boolean;

  @IsOptional()
  @IsString()
  instructorId: string;

  
}
