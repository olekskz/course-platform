import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException('No authorization token provided');
      }

      const token = authHeader.replace('Bearer ', '');
      if (!process.env.JWT_SECRET) {
        throw new UnauthorizedException('JWT secret is not configured');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as JwtPayload;

      req.user = decoded;

      if (decoded.role !== 'ADMIN') {
        throw new UnauthorizedException('Access denied. Admins only.');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token or insufficient permissions');
    }
  }
}