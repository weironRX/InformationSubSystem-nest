import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaClient],
})
export class ServiceModule {}
