import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { Course } from "src/graphql";
import { CourseById } from "src/graphql";
import { UpdateCourseDto } from "./dto/update-course.dto";
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

            return course
        } catch (err) {
            console.error("Error with fetching course", err)
            return null
        }
    }

    async updateCourse(courseId: string, data: Omit<UpdateCourseDto, 'id'>): Promise<Boolean> {
        try {
            const course = await this.prisma.course.update({
                where: { id: courseId }, 
                data: {
                    ...data
                }
            })

            return true
        } catch (err) {
            console.error("Error with updatiog course", err)
            return false
        }
    }
}