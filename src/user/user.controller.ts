import {
	Body,
	Controller,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
	Patch,
	Param,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto } from './dto/user.dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('profile')
	@Auth()
	@HttpCode(200)
	async login(@CurrentUser('id') id: number) {
		return this.userService.getProfileById(id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@Auth()
	@HttpCode(200)
	async register(@CurrentUser('id') id: number, @Body() dto: UserDto) {
		return this.userService.updateProfile(id, dto)
	}
}
