import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ClientController],
  providers: [ClientService, PrismaClient],
})
export class ClientModule {}
