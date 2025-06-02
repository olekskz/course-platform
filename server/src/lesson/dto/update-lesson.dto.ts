import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsNotEmpty, IsString, IsUrl, MaxLength, IsInt } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
    
    @IsString()
    @IsNotEmpty()
    id: string;

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
