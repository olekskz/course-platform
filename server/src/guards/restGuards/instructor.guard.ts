import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    role: string;
    id: string;
}

@Injectable()
export class InstructorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies?.token;

        if (!token) {
            throw new ForbiddenException('No token provided');
        }

        try {
            const decoded = jwtDecode<DecodedToken>(token);
            
            if (decoded.role !== 'INSTRUCTOR') {
                throw new ForbiddenException('Access denied - Instructor role required');
            }

            return true;
        } catch (error) {
            throw new ForbiddenException('Invalid token');
        }
    }
}