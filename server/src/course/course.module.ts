import {Module} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CourseService } from "./course.service";

@Module({
    providers: [PrismaService, CourseService],
})

export class CourseModule {}