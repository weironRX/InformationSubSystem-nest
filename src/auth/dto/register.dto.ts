import { MinLength, IsString, IsEmail } from 'class-validator'

export class RegisterDto {
    login: string

    @MinLength(3, {
        message: 'password gotta have 3 symbols'
    })
    @IsString()
    password: string

    @IsString()
    name: string
}

