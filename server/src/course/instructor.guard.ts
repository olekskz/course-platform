import { Injectable, CanActivate, ExecutionContext, Inject } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user && user.role === 'INSTRUCTOR') {
            return true;
        }
        return false;
    }
}
