import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Instructor } from 'src/graphql';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}
  

  async getInstructorsRequests() {
    return this.prisma.instructorRequest.findMany({
      where: {
        status: 'pending',
      },
    });
  }

  async approveInstructorRequest(id: string) {
    return this.prisma.instructorRequest.update({
      where: { id },
      data: { status: 'approved' },
    });
  }
}