import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) {}
    
    async createCourse(data: CreateCourseDto, imageUrl: string): Promise<boolean> {
        try {
                   
            await this.prisma.course.create({
                data: {
                    title: data.name,
                    description: data.description,
                    image: imageUrl,
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

    async getCourseByInstructor(instructorId: string) {
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
}