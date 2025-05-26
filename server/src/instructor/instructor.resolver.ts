import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Instructor } from 'src/graphql';
import { InstructorService } from './instructor.service';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/graphGuards/admin.guard';
import { UserGuard } from 'src/guards/graphGuards/user.guard';

@Resolver()
export class InstructorResolver {
  constructor(private readonly instructorService: InstructorService) {}

  @UseGuards(AdminGuard)
  @Query(() => [Instructor])
  async getInstructorsRequests() {
    return this.instructorService.getInstructorsRequests();
  }

  @UseGuards(UserGuard)
  @Query()
  async getInstructorPendingRequest(@Args('email') email: string) {
    return this.instructorService.getInstructorPendingRequest(email);
  }
}
