import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [LessonService, LessonResolver, PrismaService],
})
export class LessonModule {}
