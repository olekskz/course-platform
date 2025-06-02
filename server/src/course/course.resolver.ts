import { UseGuards } from "@nestjs/common";
import { CourseService } from "./course.service";
import { InstructorGuard } from "src/guards/graphGuards/instructor.guard";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CloudinaryService } from "src/cloudinary.service";
import { Course } from "./course.model"
import {  CoursesResponse, GetByIdCourseResponse } from "src/graphql";
import { PaginationInput } from "./dto/get-course.dto";



@Resolver()
export class CourseResolver {
    constructor(private readonly courseService: CourseService,
        private readonly cloudinaryService: CloudinaryService) {}
    @UseGuards(InstructorGuard)
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

    @Query(() => GetByIdCourseResponse, { nullable: true })
    async getCourseById(
        @Args('courseId') courseId: string
    ): Promise<GetByIdCourseResponse | null> {
        try {
            return await this.courseService.getCourseById(courseId);
        } catch (err) {
            console.error("Error with fetching course:", err);
            return null;
        }
    }
    
    @Mutation()
    async deleteCourse(@Args('courseId') courseId: string) {
        try {
            const cloudinaryPhoto = await this.courseService.getCourseById(courseId);
            if (cloudinaryPhoto?.course?.image_public_id) {
                await this.cloudinaryService.deleteImage(cloudinaryPhoto.course.image_public_id);
            }
            await this.courseService.deleteCourse(courseId);
            return { success: true, 
                    message: "Course deleted successfully" };
        } catch (error) {
            console.error("Error deleting course:", error);
            return { success: false, 
                    message: "Failed to delete course" };
        }
    }

    @Query()
       async getCourses(
           @Args('pagination') pagination?: PaginationInput): Promise<CoursesResponse> {
           const paginationArgs = {
               take: pagination?.take || 6,
               skip: pagination?.skip || 0
           };

           return this.courseService.getCourses(paginationArgs);
       }
}