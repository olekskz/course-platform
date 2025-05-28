import { UseGuards } from "@nestjs/common";
import { CourseService } from "./course.service";
import { InstructorGuard } from "src/guards/graphGuards/instructor.guard";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { Course } from "src/course/course.model";

@UseGuards(InstructorGuard)
@Resolver()
export class CourseResolver {
    constructor(private readonly courseService: CourseService) {}

    @Query(() => [Course])
    async getCourseByInstructorId(@Args("instructorId") instructorId: string) {
        try {
            const courses = await this.courseService.getCourseByInstructor(instructorId);
            return courses;
        } catch (error) {
            console.error("Error fetching courses by instructor:", error);
            return []
        }
    }
}