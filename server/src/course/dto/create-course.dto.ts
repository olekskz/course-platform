import {IsInt, IsNumber, IsString, IsNotEmpty} from 'class-validator'
import { Type } from 'class-transformer';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Type(() => Number) 
    price: number;

    @IsNumber()
    @Type(() => Number) 
    hours: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    instructorId: string;
}