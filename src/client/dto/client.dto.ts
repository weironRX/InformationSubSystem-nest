import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class ClientDto {
	@IsNumber()
	id: number

	@IsString()
	@IsOptional()
	alias: string

	@IsOptional()
    @IsString()
	contact: string
}
