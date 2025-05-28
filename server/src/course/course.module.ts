import {Module} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage, memoryStorage } from "multer";
import { CloudinaryService } from "src/cloudinary.service";
import { CourseResolver } from "./course.resolver";
@Module({
    imports: [
        MulterModule.register({
            storage: memoryStorage()
        })
    ],
    controllers: [CourseController],
    providers: [PrismaService, CourseService, CloudinaryService, CourseResolver],
})

export class CourseModule {}