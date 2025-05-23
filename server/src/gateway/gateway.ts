import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection} from '@nestjs/websockets';
import { PrismaService } from '../prisma.service';
import { CreateInstructorRequestDto } from './dto/create-gateway.dto';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { CreateInstructorDto } from 'src/instructor/dto/create-instructor.dto';
import { UseGuards } from '@nestjs/common';import { AdminGuard } from '../guards/graphGuards/admin.guard';
import { SocketAdminGuard } from 'src/guards/socketGuards/socketAdmin.guard';
import { SocketUserGuard } from 'src/guards/socketGuards/socketUser.guard';

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000",
  },
})
export class GatewayService implements OnGatewayConnection {
  constructor(private readonly prisma: PrismaService) {}

  @WebSocketServer()
  server: Server;

  private adminSockets = new Set<string>();

  async handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;

    if (!token) {
      client.disconnect();
      return;
    }
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if (decoded.role === 'ADMIN') {
        this.adminSockets.add(client.id);
      }
    } catch (err) {
      console.error('Invalid token', err);
      client.disconnect();
    }
  }

  @UseGuards(SocketUserGuard)
  @SubscribeMessage('InstructorRequest')
  async handleInstructorRequest(
    @MessageBody() body: CreateInstructorRequestDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { name, secondName, email, phone } = body;

    try {
      const instructor = await this.prisma.instructorRequest.create({
        data: {
          name,
          secondName,
          email,
          phone,
          status: 'pending',
        },
      });

      this.adminSockets.forEach((adminId) => {
        this.server.to(adminId).emit('instructorRequest', instructor);
      });
      console.log(this.adminSockets);
      return { success: true };
    } catch (error) {
      console.error('Error creating instructor request:', error);
      throw error;
    }
  }

  @UseGuards(SocketAdminGuard)
  @SubscribeMessage('approveInstructorRequest')
  async handleApproveInstructorRequest(@MessageBody() id: string) {
    if (!id) {
      console.error('No ID provided for instructor request approval');
      return;
    }

    try {
      await this.prisma.instructorRequest.update({
        where: { id },
        data: { status: 'approved' },
      });
    } catch (error) {
      console.error('Error approving instructor request:', error);
      throw error;
    }
  }

  @UseGuards(SocketAdminGuard)
  @SubscribeMessage('rejectInstructorRequest')
  async handleRejectInstructorRequest(@MessageBody() id: string) {
    if (!id) {
      console.error('No ID provided for instructor request rejection');
      return;
    }

    try {
      await this.prisma.instructorRequest.update({
        where: { id },
        data: { status: 'rejected' },
      });
    } catch (error) {
      console.error('Error rejecting instructor request:', error);
      throw error;
    }
  }
  @UseGuards(SocketAdminGuard)
  @SubscribeMessage('createInstructor')
  async handleCreateInstructor(@MessageBody() body: CreateInstructorDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    const userPassword = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        password: true,
      },
    });
    if (user) {
      await this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    }
    try {
      const { name, secondName, phone, email } = body;
      await this.prisma.instructor.create({
        data: {
          name,
          secondName,
          phone,
          email,
          password: userPassword?.password || '',
          role: 'INSTRUCTOR',
        },
      });
    } catch (error) {
      console.error('Error creating instructor:', error);
      throw error;
    }
  }
}