import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
	configService: ConfigService,
): Promise<JwtModuleOptions> => ({
	secret: configService.get('JWT_SECRET'),
})

export const tokensTime = {
	accessToken: '15m',
	refreshToken: '7d',
}
