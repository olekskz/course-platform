import { Module } from '@nestjs/common';
import { GatewayService } from './gateway';
import { PrismaService } from '../prisma.service';


@Module({
  providers: [GatewayService, PrismaService],
})
export class GatewayModule {}
