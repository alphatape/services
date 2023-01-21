import { IsEmail, IsString } from 'class-validator';

class LogInDto {
  @IsEmail()
	public email: string;
	
	@IsString()
	public token: string;
}

export default LogInDto;
