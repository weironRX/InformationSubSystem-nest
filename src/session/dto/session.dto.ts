import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class SessionDto {
	@IsString()
	@IsOptional()
	hour: string

    @IsString()
	@IsOptional()
	alias: string

    @IsString()
	@IsOptional()
	contact: string

    @IsString()
	@IsOptional()
	service: string

	@IsOptional()
	price: string
}
