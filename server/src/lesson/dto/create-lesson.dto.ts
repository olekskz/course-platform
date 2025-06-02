import {IsInt, IsNumber, IsString, IsNotEmpty, maxLength, MaxLength, IsUrl} from 'class-validator'
import { Type } from 'class-transformer';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @MaxLength(1000)
    content: string;

    @IsUrl()
    videoUrl: string

    @IsString()
    materials?: string

    @IsInt()
    lessonOrder: number

    @IsString()
    courseId: string
}