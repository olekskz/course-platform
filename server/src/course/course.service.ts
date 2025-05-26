import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { CloudinaryStorage } from "multer-storage-cloudinary";



@Injectable()
export class CourseService {
    storage: CloudinaryStorage;
    constructor(private prisma: PrismaService) {}
    
    async createCourse(data: CreateCourseDto, imageUrl: string): Promise<boolean> {
        try {
                   
            await this.prisma.course.create({
                data: {
                    name: data.name,
                    description: data.description,
                    image: imageUrl,
                    price: data.price,
                    hours: data.hours,
                    instructorId: data.instructorId,
                    lessonsCount: 0,
                },
            });

            return true;
        } catch (error) {
            console.error("Error creating course:", error);
            throw error;
        }
    }
}