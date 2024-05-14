import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { returnUserObject } from './return-user.object'
import { Prisma, PrismaClient, User } from '@prisma/client'
import { UserDto } from './dto/user.dto'
import { BadRequestException } from '@nestjs/common/exceptions'
import { hash } from 'argon2'
import { generatePassword } from 'src/utils/generate-password'
import { RecoverDto } from './dto/recover.dto'
import { sendRecoverLetter } from './send-email'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaClient,
	) {}


	async getProfileById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: +id,
			},
			select: {
				...returnUserObject
			}
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async updateProfile(id: number, dto: UserDto) {

		const user = await this.prisma.user.findUnique({
			where: {
				id: id,
			},
		})

		const sameEmailUser = await this.prisma.user.findUnique({
			where: {
				login: dto.login
			}
		})

		if (sameEmailUser && sameEmailUser.id != user.id) throw new BadRequestException('Пользователь с такой почтой существует')

		const updatedUser = await this.prisma.user.update({
			where: {
				id: +id,
			},
			data: {
				login: dto.login,
				name: dto.name,
				password: dto.password ? await hash(dto.password) : user.password,
			},
			select: {
				...returnUserObject
			}
		})

		return updatedUser
	}

	async recoverPassword(dto: RecoverDto) {
		const password: string = generatePassword(length=8)

		const currentUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email,
			}
		})

		sendRecoverLetter(password, dto.email)

		await this.prisma.user.update({
			where: {
				email: dto.email,
			},
			data: {
				password: await hash(password)
			}
		})
		
	}
}
