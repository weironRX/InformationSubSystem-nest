import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class ServiceDto {
	@IsNumber()
	id: number

	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
	price: string
}

export class CreateServiceDto {
	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
	price: string
}
