import { IsEmail, IsString } from 'class-validator';

class RegisterDto {
  @IsEmail()
  public email: string;
}

export default RegisterDto;
