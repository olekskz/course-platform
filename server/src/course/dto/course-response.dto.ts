import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCourseResponse {
    @Field()
    success: boolean;
}