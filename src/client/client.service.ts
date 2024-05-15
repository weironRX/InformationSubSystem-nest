import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ClientDto, CreateClientDto } from './dto/client.dto';
import { returnClientObject } from './return-client.object';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ClientService {
    constructor(
		private prisma: PrismaClient,
	) {}


    async getAll(id: number) {
        const res = await this.prisma.client.findMany({
            where: {
                userId: id,
            },
            select: {
                ...returnClientObject,
            },
        })

        return res
    }

    async getAllBySearch(id: number, alias: string, contact: string) {
        console.log(await this.prisma.client.findMany())

        const res = await this.prisma.client.findMany({
            where: {
                userId: id,
                ...(alias != "" && {alias: {contains: alias}}),
                ...(contact != "" && {contact: {contains: contact}})
            },
            select: {
                ...returnClientObject,
            },
        })

        return res
    }

    async getByAlias(id: number, alias: string) {
        const res = await this.prisma.client.findMany({
            where: {
                userId: id,
                alias: alias
            },
            select: {
                ...returnClientObject,
            }
        })

        if (!res) throw new BadRequestException('Service does not exist')

        return res
    }

    async create(id: number, dto: CreateClientDto) {

        const existClient = await this.prisma.client.findFirst({
            where: {
                userId: id,
                alias: dto.alias
            }
        })

        if (existClient) return

        const res = await this.prisma.client.create({
            data: {
                userId: id,
                alias: dto.alias,
                contact: dto.contact
            },
            select: {
                ...returnClientObject,
            }
        })

        return res
    }

    async update(id: number, dto: ClientDto) {

        const updatedClient = await this.prisma.client.update({
            where: {
                id: dto.id,
            },
            data: {
                alias: dto.alias,
                contact: dto.contact
            },
            select: {
                ...returnClientObject,
            }
        })

        console.log("Updated", updatedClient)

        return updatedClient
    }
}
