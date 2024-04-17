import { Module } from '@nestjs/common';
import { ChangeService } from './change.service';
import { ChangeController } from './change.controller';
import { PrismaService } from 'src/prisma.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ChangeController],
  providers: [ChangeService, PrismaClient],
})
export class ChangeModule {}
