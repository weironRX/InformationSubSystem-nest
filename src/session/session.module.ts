import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SessionController],
  providers: [SessionService, PrismaClient],
})
export class SessionModule {}
