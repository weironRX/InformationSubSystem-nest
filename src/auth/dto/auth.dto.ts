import { MinLength, IsString, IsEmail } from 'class-validator'

export class AuthDto {
  login: string

  @MinLength(3, {
    message: 'password gotta have 6 symbols'
  })
  @IsString()
  password: string

}

