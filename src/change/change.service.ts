import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChangeDto } from './dto/change.dto';
import { returnChangeObject } from './return-change.object';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChangeService {
    constructor(
		private prisma: PrismaClient,
	) {}

    async getAll(id: number) {
        const res = await this.prisma.change.findMany({
            where: {
                userId: id,
            },
            select: {
                ...returnChangeObject
            }
        })

        return res
    }

    async createChange(id: number, dto: ChangeDto) {
        const res = await this.prisma.change.create({
            data: {
                date: dto.date,
                length: dto.length,
                userId: id
            }
        })

        return res
    }
}
