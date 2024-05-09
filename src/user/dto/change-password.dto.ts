import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class ChangePasswordDto {
	@IsString()
	password: string
}
