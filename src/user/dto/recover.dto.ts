import { IsString } from 'class-validator'

export class RecoverDto {
	@IsString()
	login: string
}
