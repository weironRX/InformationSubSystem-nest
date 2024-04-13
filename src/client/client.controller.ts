import { Controller, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import {
	Body,
	Get,
	HttpCode,
	Put,
	UsePipes,
	ValidationPipe,
	Patch,
	Param,
  Post
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ClientDto } from './dto/client.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
	@Auth()
	@HttpCode(200)
	async getAll(@CurrentUser('id') id: number) {
    return this.clientService.getAll(id)
	}

  /*@ApiQuery({ name: 'alias', required: false })
  @ApiQuery({ name: 'contact', required: false })*/
  @Get("search")
	@Auth()
	@HttpCode(200)
	async getAllBySearch(@CurrentUser('id') id: number, @Query("alias") alias: string, @Query("contact") contact: string) {
    return this.clientService.getAllBySearch(id, alias, contact)
	}

  @UsePipes(new ValidationPipe())
  @Get(":alias")
  @Auth()
	@HttpCode(200)
  async getByAlias(@CurrentUser('id') id: number, @Param('alias') alias: string) {
    return this.clientService.getByAlias(id, alias)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
	@HttpCode(200)
  async create(@CurrentUser('id') id: number, @Body() dto: ClientDto) {
    return this.clientService.create(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @Put()
  @Auth()
	@HttpCode(200)
  async update(@CurrentUser('id') id: number, @Body() dto: ClientDto) {
    return this.clientService.update(id, dto)
  }
}
