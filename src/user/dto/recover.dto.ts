import { IsString } from 'class-validator'

export class RecoverDto {
	@IsString()
	email: string
}
