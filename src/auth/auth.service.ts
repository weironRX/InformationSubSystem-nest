import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
	NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'
import { RegisterDto } from './dto/register.dto'
import { hash } from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { tokensTime } from 'src/config/jwt.config'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async getNewTokens(refreshToken: string) {
		const userResult = await this.jwt.verifyAsync(refreshToken)
		if (!userResult) throw new UnauthorizedException('Invalid refresh token')

		// finds user by id with prisma
		const user = await this.prisma.user.findUnique({
            where: {
                id: userResult.id
            }
        })

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	async register(dto: RegisterDto) {
		const existUser = await this.prisma.user.findUnique({
            where: {
                login: dto.login
            }
        })

		if (existUser) throw new BadRequestException('User already exists')

		const user = await this.prisma.user.create({
			data: {
                login: dto.login,
				password: await hash(dto.password),
				name: dto.name,
            }
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens,
		}
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, {
			expiresIn: tokensTime.accessToken,
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: tokensTime.refreshToken,
		})

		return { accessToken, refreshToken }
	}

	private returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.login,
			name: user.name
		}
	}

	private async validateUser(dto: AuthDto) {
		const user = await this.prisma.user.findUnique({
            where: {
                login: dto.login
            }
        })

		if (!user) throw new NotFoundException('user not found')

		const isValidPassword = await verify(user.password, dto.password)

		if (!isValidPassword) throw new UnauthorizedException('Invalid password')

		return user
	}
}
