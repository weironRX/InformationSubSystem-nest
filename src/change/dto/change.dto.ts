import { IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class ChangeDto {
	@IsString()
	@IsOptional()
	date: string

	@IsOptional()
	length: string
}
