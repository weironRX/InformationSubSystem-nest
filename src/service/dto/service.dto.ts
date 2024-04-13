import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class ServiceDto {
	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
	price: string
}
