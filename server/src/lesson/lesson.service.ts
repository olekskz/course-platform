import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma.service';
import { GetLessonsResponse, CreateLessonResponse } from './dto/types';
import { UpdateLessonInput } from 'src/graphql';


@Injectable()
export class LessonService {
  constructor(private readonly prismaService: PrismaService) {}
  async createLesson(data: CreateLessonDto): Promise<CreateLessonResponse> {
    try {
      await this.prismaService.lesson.create({
        data: {
          title: data.title,
          content: data.content,
          videoUrl: data.videoUrl,
          materials: data.materials,
          lessonOrder: data.lessonOrder,
          courseId: data.courseId
        }
      });
      return {
        success: true,
        message: "Lesson created successfully!"
      }
    } catch (err) {
      console.error(err)
      return {
        success: false,
        message: "Error with creating lesson"
      }
    }
    
  }

async getLessonsByCourseId(courseId: string): Promise<GetLessonsResponse> {
    try {
      const lessons = await this.prismaService.lesson.findMany({
        where: { courseId }
      });
      
      return {
        lessons,
        success: true,
        message: "Lessons fetched successfully!"
      };
    } catch (err) {
      return {
        lessons: [],
        success: false,
        message: err instanceof Error ? err.message : 'Failed to fetch lessons'
      };
    }
  }

  async getLessonById(lessonId: string) {
    try {
      const lesson = await this.prismaService.lesson.findUnique({
        where: { id: lessonId}
      })

      return lesson
    } catch (err) {
      console.error(err)
      return err
    }
  }

  async updateLesson(data: Omit<UpdateLessonDto, 'id'>, lessonId: string) {
    try {
      await this.prismaService.lesson.update({
        where: {id: lessonId},
        data: {
          ...data
        }
      })
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
}
