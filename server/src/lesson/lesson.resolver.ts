import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Body, UseGuards } from '@nestjs/common';
import { InstructorGuard } from 'src/guards/graphGuards/instructor.guard';
import { GetLessonsResponse, CreateLessonResponse } from './dto/types';
import { Lesson, UpdateLessonResponse } from 'src/graphql';
import { UpdateLessonInput } from 'src/graphql';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@UseGuards(InstructorGuard)
@Resolver('Lesson')
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Mutation('createLesson')
  async createLesson(
    @Args('input') createLessonInput: CreateLessonDto
  ): Promise<CreateLessonResponse> {
    try {
      await this.lessonService.createLesson(createLessonInput);
      return {
        success: true,
        message: 'Lesson created successfully!'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to create lesson'
      };
    }
  }

  @Query('getLessonsByCourse')
  async getLessonsByCourse(@Args('courseId') courseId: string): Promise<GetLessonsResponse> {
    try {
      const response = await this.lessonService.getLessonsByCourseId(courseId);
      return response;
    } catch (err) {
      return {
        lessons: [],
        success: false,
        message: err instanceof Error ? err.message : 'Failed to fetch lessons'
      };
    }
  }

  @Query()
  async getLessonById(@Args('lessonId') lessonId: string): Promise<Lesson> {
    try{
      const lesson = await this.lessonService.getLessonById(lessonId)
      return lesson
    } catch (err) {
      return err
    }
  }

  @Mutation()
  async updateLesson(@Args('input') updateLessonInput: UpdateLessonDto): Promise<UpdateLessonResponse> {
    try {
      const lessonId = updateLessonInput.id
      await this.lessonService.updateLesson(updateLessonInput, lessonId)
      return {
        success: true,
        message: "Lesson updated successfully!"
      }
    } catch (err) {
      return {
        success: false,
        message: `Error with updating lesson, ${err}`
      }
    }
  }
}