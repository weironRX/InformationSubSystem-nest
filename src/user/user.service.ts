import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from './return-user.object'
import { Prisma, User } from '@prisma/client'
import { UserDto } from './dto/user.dto'
import { BadRequestException } from '@nestjs/common/exceptions'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
	) {}


	async getProfileById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: +id,
			},
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const sameUser = await this.prisma.user.findUnique({
            where: {
                login: dto.login
            }
        })

		if (id !== sameUser.id)
			throw new BadRequestException('Email in use already')

		const user = await await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		})

		const updatedUser = await this.prisma.user.update({
			where: {
				id: +id,
			},
			data: {
				login: dto.login,
				name: dto.name,
				password: dto.password ? await hash(dto.password) : user.password,
			},
		})

		return updatedUser
	}
}
