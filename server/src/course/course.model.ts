import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Course {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  image: string;

  @Field()
  hours: number;

  @Field()
  isActive: boolean;

  @Field()
  instructorId: string;

  @Field()
  lessonsCount: number;
}
