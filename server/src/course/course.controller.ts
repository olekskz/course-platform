import { Body, Controller, Post, UseGuards, Put, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CourseService } from './course.service';
import { InstructorGuard } from 'src/guards/restGuards/instructor.guard';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateCourseResponse } from './dto/course-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary.service';
import { UpdateCourseDto } from './dto/update-course.dto';


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
            console.log(image.url)
            console.log(image.public_id)
            if (image) {
                const course = await this.courseService.createCourse(
                    createCourseDto,
                    image.url,
                    image.public_id
                );
                return { success: true } as CreateCourseResponse;
            }
        } catch (error) {
            console.error('Error uploading image or creating course:', error);
            return { success: false, message: 'Failed to create course' } as CreateCourseResponse;
        }
    }

@Post('update')
@UseInterceptors(FileInterceptor('image'))
async updateCourse(
  @UploadedFile() file: Express.Multer.File,
  @Body() updateCourseDto: UpdateCourseDto
) {
  try {
    const existingCourse = await this.courseService.getCourseById(updateCourseDto.id);
    if (!existingCourse) {
      throw new NotFoundException('Course not found');
    }

    let uploadedImage: { url: string; public_id: string; } | null = null;
    
    if (file) {
      if (existingCourse.image_public_id) {
        await this.cloudinaryService.deleteImage(existingCourse.image_public_id);
      }
      uploadedImage = await this.cloudinaryService.uploadImage(file.buffer);
    }

    const courseData = {
      title: updateCourseDto.title,
      description: updateCourseDto.description,
      price: updateCourseDto.price,
      hours: updateCourseDto.hours,
      isActive: updateCourseDto.isActive,
      image: uploadedImage ? uploadedImage.url : existingCourse.image,
      image_public_id: uploadedImage ? uploadedImage.public_id : existingCourse.image_public_id
    };

    await this.courseService.updateCourse(updateCourseDto.id, courseData);

    return {
      success: true,
      message: 'Course updated successfully'
    };
  } catch (error) {
    console.error('Error updating course:', error);
    throw new InternalServerErrorException('Failed to update course');
  }
}

}