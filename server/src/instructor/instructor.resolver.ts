import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Instructor } from 'src/graphql';
import { InstructorService } from './instructor.service';

@Resolver()
export class InstructorResolver {
  constructor(private readonly instructorService: InstructorService) {}

  @Query(() => [Instructor])
  async getInstructorsRequests() {
    return this.instructorService.getInstructorsRequests();
  }
}
