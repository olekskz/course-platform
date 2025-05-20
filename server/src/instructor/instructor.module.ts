import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorResolver } from './instructor.resolver';
import { PrismaService } from '../prisma.service';
@Module({
  providers: [InstructorService, InstructorResolver, PrismaService],
  exports: [InstructorService],
})
export class InstructorModule {}
