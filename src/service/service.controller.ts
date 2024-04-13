import { Controller, Post } from '@nestjs/common';
import { ServiceService } from './service.service';
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
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ServiceDto } from './dto/service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
  
  @Get()
	@Auth()
	@HttpCode(200)
	async getAll(@CurrentUser('id') id: number) {
    return this.serviceService.getAll(id);
	}

  @UsePipes(new ValidationPipe())
  @Get(":name")
  @Auth()
	@HttpCode(200)
  async getByName(@CurrentUser('id') id: number, @Param('name') name: string) {
    return this.serviceService.getByName(id, name);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
	@HttpCode(200)
  async create(@CurrentUser('id') id: number, @Body() dto: ServiceDto) {
    return this.serviceService.create(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Put()
  @Auth()
	@HttpCode(200)
  async update(@CurrentUser('id') id: number, @Body() dto: ServiceDto) {
    return this.serviceService.update(id, dto);
  }
}
