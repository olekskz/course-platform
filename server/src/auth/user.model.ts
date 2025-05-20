import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LoginUser {
    @Field(() => ID)
    id: string;
    
    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

}

@ObjectType()
export class RegisterUser {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
    
}
