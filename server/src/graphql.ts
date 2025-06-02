
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    USER = "USER",
    INSTRUCTOR = "INSTRUCTOR",
    ADMIN = "ADMIN"
}

export class CreateLessonInput {
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    courseId: string;
    materials?: Nullable<string>;
}

export class UpdateLessonInput {
    id: string;
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    courseId: string;
    materials?: Nullable<string>;
}

export class PaginationInput {
    take?: Nullable<number>;
    skip?: Nullable<number>;
}

export class User {
    id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    roles: UserRole[];
}

export class Instructor {
    id: string;
    name: string;
    secondName: string;
    email: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
}

export class InstructorRequest {
    id: string;
    name: string;
    secondName: string;
    phone: string;
    email: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export class InstructorRequestResponse {
    success: boolean;
}

export class AuthPayload {
    access_token?: Nullable<string>;
    id: string;
    email: string;
}

export class DeleteCourseResponse {
    success: boolean;
    message: string;
}

export class CreateLessonResponse {
    success: boolean;
    message: string;
}

export class UpdateLessonResponse {
    success: boolean;
    message: string;
}

export class PageInfo {
    hasNextPage: boolean;
    total: number;
}

export class CoursesResponse {
    courses: Course[];
    pageInfo: PageInfo;
}

export abstract class IMutation {
    abstract userRegister(email: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract userLogin(email: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract createInstructor(name: string, secondName: string, phone: string): string | Promise<string>;

    abstract createInstructorRequest(name: string, secondName: string, phone: string, email: string): InstructorRequestResponse | Promise<InstructorRequestResponse>;

    abstract deleteCourse(courseId: string): DeleteCourseResponse | Promise<DeleteCourseResponse>;

    abstract createLesson(input: CreateLessonInput): CreateLessonResponse | Promise<CreateLessonResponse>;

    abstract updateLesson(input: UpdateLessonInput): UpdateLessonResponse | Promise<UpdateLessonResponse>;
}

export abstract class IQuery {
    abstract user(): User | Promise<User>;

    abstract getInstructorsRequests(): InstructorRequest[] | Promise<InstructorRequest[]>;

    abstract getInstructorPendingRequest(email: string): InstructorRequestResponse | Promise<InstructorRequestResponse>;

    abstract getCourseByInstructorId(instructorId: string): Course[] | Promise<Course[]>;

    abstract getCourseById(courseId: string): GetByIdCourseResponse | Promise<GetByIdCourseResponse>;

    abstract getLessonsByCourse(courseId: string): GetLessonsResponse | Promise<GetLessonsResponse>;

    abstract getLessonById(lessonId: string): Lesson | Promise<Lesson>;

    abstract getCourses(pagination?: Nullable<PaginationInput>): CoursesResponse | Promise<CoursesResponse>;
}

export class GetLessonsResponse {
    lessons: Lesson[];
    success: boolean;
    message: string;
}

export class Lesson {
    id: string;
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    courseId: string;
    materials?: Nullable<string>;
}

export class GetByIdCourseResponse {
    course?: Nullable<Course>;
    lessons: Lesson[];
}

export class Course {
    id: string;
    title: string;
    description: string;
    price: number;
    hours: number;
    lessonsCount: number;
    image: string;
    studentsCount: number;
    isActive: boolean;
}

type Nullable<T> = T | null;
