import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
	@IsEmail()
	login: string

	@IsOptional()
	@IsString()
	password: string

	@IsString()
	@IsOptional()
	name: string

	@IsOptional()
	@IsString()
	id: number
}
