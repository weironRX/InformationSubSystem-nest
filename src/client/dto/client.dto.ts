import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class ClientDto {
	@IsString()
	@IsOptional()
	alias: string

	@IsOptional()
    @IsString()
	contact: string
}
