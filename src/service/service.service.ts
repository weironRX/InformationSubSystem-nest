import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ServiceDto } from './dto/service.dto';
import { returnServiceObject } from './return-service.object';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ServiceService {
    constructor(
		private prisma: PrismaClient,
	) {}

    async getAll(id: number) {
        const res = await this.prisma.service.findMany({
            where: {
                userId: id
            },
            select: {
                ...returnServiceObject
            }
        })

        return res
    }

    async getByName(id: number, name: string) {
        const res = await this.prisma.service.findFirst({
            where: {
                userId: id,
                name: name
            },
            select: {
                ...returnServiceObject
            }
        })

        if (!res) throw new BadRequestException('Service does not exist')

        return res
    }

    async create(id: number, dto: ServiceDto) {
        const existService = await this.prisma.service.findUnique({
            where: {
                name: dto.name
            }
        })

		if (existService) return

        const res = await this.prisma.service.create({
            data: {
                userId: id,
                name: dto.name,
                price: dto.price
            },
            select: {
                ...returnServiceObject
            }
        })

        return res
    }

    async update(id: number, dto: ServiceDto) {
        const updatedService = await this.prisma.service.update({
            where: {
                name: dto.name,
            },
            data: {
                price: dto.price
            },
            select: {
                ...returnServiceObject
            }
        })

        return updatedService
    }
}
