import { Module } from '@nestjs/common';
import { ChangeService } from './change.service';
import { ChangeController } from './change.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ChangeController],
  providers: [ChangeService, PrismaService],
})
export class ChangeModule {}
