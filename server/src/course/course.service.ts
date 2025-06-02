import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Course } from "src/graphql";
import { UpdateCourseDto } from "./dto/update-course.dto";

interface PaginationArgs {
    take?: number;
    skip?: number;
}

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) {}
    
    async createCourse(data: CreateCourseDto, imageUrl: string, public_id: string): Promise<boolean> {
        try {
                   
            await this.prisma.course.create({
                data: {
                    title: data.name,
                    description: data.description,
                    image: imageUrl,
                    image_public_id: public_id,
                    price: data.price,
                    hours: data.hours,
                    instructorId: data.instructorId,
                },
            });

            return true;
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
    }

    async getCourseByInstructor(instructorId: string): Promise<Course[]> {
        try {
            const courses = await this.prisma.course.findMany({
                where: { instructorId },
            });
            return courses;
        } catch (error) {
            console.error("Error fetching courses for instructor:", error);
            return []
        }
    }

    async getCourseById(courseId: string) {
        try {
            const course = await this.prisma.course.findUnique({
                where: { id: courseId }
            })

            const lessons = await this.prisma.lesson.findMany({
                where: { courseId }
            })

            return { course, lessons }
        } catch (err) {
            console.error("Error with fetching course", err)
            return null
        }
    }

    async updateCourse(courseId: string, data: Omit<UpdateCourseDto, 'id'>): Promise<Boolean> {
        try {
            
            const updateData = {
                ...data,
                isActive: data.isActive === true ? true : false
            };

            const course = await this.prisma.course.update({
                where: { id: courseId }, 
                data: updateData
            });

            if (!course) {
                throw new Error('Course not found');
            }

            return true;
        } catch (err) {
            console.error("Error updating course:", err);
            return false;
        }
    }

    async deleteCourse(courseId: string): Promise<Boolean> {
        try {
            await this.prisma.course.delete({
                where: { id: courseId }
            })
            return true
        } catch (err) {
            console.error("Error with deleting course", err)
            return false
        }
    }

    async getCourses(args: PaginationArgs = { take: 6, skip: 0 }) {
        try {
            const [courses, totalCount] = await Promise.all([
                this.prisma.course.findMany({
                    take: args.take,
                    skip: args.skip,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }),
                this.prisma.course.count()
            ]);

            return {
                courses,
                pageInfo: {
                    hasNextPage: (args.skip || 0) + (args.take || 0) < totalCount,
                    total: totalCount
                }
            };
        } catch (err) {
            console.error("Error fetching courses:", err);
            return {
                courses: [],
                pageInfo: {
                    hasNextPage: false,
                    total: 0
                }
            };
        }
    }
}