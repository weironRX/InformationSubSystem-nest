import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ChangeService } from './change.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ChangeDto } from './dto/change.dto';

@Controller('change')
export class ChangeController {
  constructor(private readonly changeService: ChangeService) {}

  @Get()
  @Auth()
  @HttpCode(200)
  async getAll(@CurrentUser('id') id: number) {
    return this.changeService.getAll(id)
  }

  @Post()
  @Auth()
  @HttpCode(200)
  async createChange(@CurrentUser('id') id: number, @Body() dto: ChangeDto) {
    return this.changeService.createChange(id, dto)
  }
}
