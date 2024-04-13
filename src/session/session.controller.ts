import { Controller, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import {
	Body,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
	Patch,
	Param,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { SessionDto } from './dto/session.dto';

@Controller('session')
export class SessionController {
  	constructor(private readonly sessionService: SessionService) {}

  	@Get(":date")
	@Auth()
	@HttpCode(200)
	async getByDay(@CurrentUser('id') id: number, @Param('date') date: string) {
		return this.sessionService.getByDay(id, date);
	}

	@Get("/completed/:date")
	@Auth()
	@HttpCode(200)
	async getCompleted(@CurrentUser('id') id: number, @Param('date') date: string) {
		console.log(date)
		return this.sessionService.getCompleted(id, date);
	}

	@Post(":date")
	@Auth()
	@HttpCode(200)
	async create(@CurrentUser('id') id: number, @Body() dto: SessionDto, @Param('date') date: string) {
		return this.sessionService.update(id, dto, date);
	}
}
