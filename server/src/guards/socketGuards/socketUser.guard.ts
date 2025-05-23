import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

@Injectable()
export class SocketUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const socket = context.switchToWs().getClient();
    
    const token = socket.handshake.auth?.token;

    if (!token) {
      throw new UnauthorizedException("No authorization token provided");
    }

    if (!process.env.JWT_SECRET) {
      throw new UnauthorizedException("JWT secret is not configured");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      
      socket.user = decoded;

      if (decoded.role !== "USER") {
        throw new UnauthorizedException("Access denied. Users only.");
      }

      return true;
    } catch (error) {
      console.error("Token verification error:", error);
      throw new UnauthorizedException("Invalid token or insufficient permissions");
    }
  }
}