import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { InstructorGuard } from 'src/guards/restGuards/instructor.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateCourseResponse } from './dto/course-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary.service';

@UseGuards(InstructorGuard)
@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService, 
                private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async createCourse(
        @UploadedFile() file: Express.Multer.File,
        @Body() createCourseDto: CreateCourseDto) {
        try {
            const image = await this.cloudinaryService.uploadImage(file.buffer);
            if (image) {
                const course = await this.courseService.createCourse(
                    createCourseDto,
                    image.secure_url
                );
                return { success: true } as CreateCourseResponse;
            }
        } catch (error) {
            console.error('Error uploading image or creating course:', error);
            return { success: false, message: 'Failed to create course' } as CreateCourseResponse;
        }
    }
}