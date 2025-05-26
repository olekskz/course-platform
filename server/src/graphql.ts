
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

export abstract class IMutation {
    abstract userRegister(email: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract userLogin(email: string, password: string): AuthPayload | Promise<AuthPayload>;

    abstract createInstructor(name: string, secondName: string, phone: string): string | Promise<string>;

    abstract createInstructorRequest(name: string, secondName: string, phone: string, email: string): InstructorRequestResponse | Promise<InstructorRequestResponse>;
}

export abstract class IQuery {
    abstract user(): User | Promise<User>;

    abstract getInstructorsRequests(): InstructorRequest[] | Promise<InstructorRequest[]>;

    abstract getInstructorPendingRequest(email: string): InstructorRequestResponse | Promise<InstructorRequestResponse>;
}

type Nullable<T> = T | null;
