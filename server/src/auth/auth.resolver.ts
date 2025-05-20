import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUser, LoginUser } from './user.model';


@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginUser)
  async userRegister(@Args('email') email: string, @Args('password') password: string, @Context() context) {
    try {
      const user = await this.authService.RegisterUser({ email, password });
      
      const { access_token } = await this.authService.login(user);

      context.res.cookie('token', access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        path: '/',
      });

      return { ...user, access_token };
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => LoginUser)
  async userLogin(@Args('email') email: string, @Args('password') password: string, @Context() context) {
    try {
      const user = await this.authService.LoginUser({ email, password });
      const { access_token } = await this.authService.login(user);

      context.res.cookie('token', access_token, {
        httpOnly: false,
        secure: process.env.NODE_ENV,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
      
      return { ...user, access_token };
    } catch (error) {
      throw error;
    }
  } 

}
