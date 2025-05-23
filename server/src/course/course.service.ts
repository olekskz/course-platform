import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class CourseService {
    constructor(private prisma: PrismaService) {}
    
}