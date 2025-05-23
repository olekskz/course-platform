import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { InstructorModule } from './instructor/instructor.module';
import { GatewayModule } from './gateway/gateway.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    InstructorModule,
    GatewayModule,
    CourseModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
