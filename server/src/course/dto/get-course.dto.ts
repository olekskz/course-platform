import { IsOptional, IsNumber, Min } from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(0)
    skip?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    @Min(1)
    take?: number;
}