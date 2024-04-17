import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SessionDto } from './dto/session.dto';
import { returnSessionObject } from './return-session.object';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SessionService {
    constructor(
		private prisma: PrismaClient,
	) {}

    async getByDay(id: number, date: string) {
		const res = await this.prisma.session.findMany({
			where: {
				userId: id,
				createdAt: {
					gte: new Date(date),
					lte: new Date(date)
				}
			},
			select: {
				...returnSessionObject,
			}
		})

		return res
	}

	async getCompleted(id: number, date: string) {
		let curr = new Date(date)

		curr.setDate(curr.getDate() - 1)

		const res = await this.prisma.session.findMany({
			where: {
				userId: id,
				createdAt: {
					lte: curr
				}
			},
			select: {
				...returnSessionObject,
			}
		})

		return res
	}

	async update(id: number, dto: SessionDto, date: string) {
		const exists = await this.prisma.session.findFirst({
			where: {
				userId: id,
				createdAt: {
					gte: new Date(date),
					lte: new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
				},
				hour: dto.hour
			}
		})

		if (exists) {
			const res = this.prisma.session.update({
				where: {
					userId: id,
					id: exists.id,
					createdAt: {
						gte: new Date(date),
						lte: new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
					},
					hour: dto.hour
				},
				data: {
					alias: dto.alias,
					contact: dto.contact,
					service: dto.service,
					price: dto.price
				},
				select: {
					...returnSessionObject,
				}
			})

			return res;
		} else {

			const res = this.prisma.session.create({
				data: {
					userId: id,
					alias: dto.alias,
					contact: dto.contact,
					service: dto.service,
					price: dto.price,
					hour: dto.hour,
					createdAt: new Date(date)
				},
				select: {
					...returnSessionObject,
				}
			})

			return res;
		}
	}
}