import LogInDto from 'dto/login.dto';
import { Request, Response, Router } from 'express';
import * as express from 'express';
import Controller from 'interfaces/controller.interface';
import validationMiddleware from 'middleware/validation.middleware';
import User from 'entities/user.entity';
import { getRepository } from 'typeorm';
import RegisterDto from 'dto/register.dto';
import VerificationToken from 'entities/verificationtoken.entity';
import Session from 'entities/session.entity';
import { v4 as uuidv4 } from 'uuid';
import sendMail from 'utils/sendMail';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();
  private userRepository = getRepository(User);
  private verificationTokenRepository = getRepository(VerificationToken);
  private sessionRepository = getRepository(Session);
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(RegisterDto),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.logIn
    );
    this.router.post(`${this.path}/logout`, this.logout);
  }

  private register = async (request: Request, response: Response) => {
    const loginData: LogInDto = request.body;
    try {
      const user = await this.userRepository.findOneBy({
        email: loginData.email,
      });
      if (user) {
        await this.generateRandomOTP(user.id, user.email);
        response.send(user);
      } else {
        const newUser = await this.userRepository.create(loginData);
        const data = await this.userRepository.save(newUser);
        await this.generateRandomOTP(user.id, user.email);
        response.send(data);
      }
    } catch (e) {
      response.send(e);
    }
  };

  private logIn = async (request: Request, response: Response) => {
    const loginData: LogInDto = request.body;
    const user = await this.userRepository.findOneBy({
      email: loginData.email,
    });
    const datarow = await this.verificationTokenRepository.find({
      where: {
        identifier: user.id,
        token: loginData.token,
      },
    });
    if (datarow && Array.isArray(datarow) && datarow.length > 0) {
      await this.createSession(user.id);
      response.send(user);
    } else {
      response.send({
        status: 400,
        message: 'Verification token is invalid',
      });
    }
  };

  private logout = async (request: Request, response: Response) => {
    response.send('logout');
  };

  private createSession = async (userId) => {
    try {
      const datarow = await this.sessionRepository.findOneBy({
        userId,
			});
			let sessionData;
			if (datarow) {
				return await this.sessionRepository.save({
					...datarow,
					sessionToken: uuidv4(),
        });
			} else {
				sessionData = await this.sessionRepository.create({
					userId
				})
      }
      return await this.sessionRepository.save(sessionData);
    } catch (e) {
      console.error(e);
    }
  };

  private generateRandomOTP = async (identifier,receiverEmail) => {
    try {
      var digits = '0123456789';
      let token = '';
      for (let i = 0; i < 6; i++) {
        token += digits[Math.floor(Math.random() * 10)];
      }
      const datarow = await this.verificationTokenRepository.findOneBy({
        identifier,
      });
      let verificationTokenData;
      if (datarow) {
        verificationTokenData = await this.verificationTokenRepository.save(
					{
						...datarow,
            token,
            identifier,
          }
        );
      } else {
        verificationTokenData = await this.verificationTokenRepository.create({
          token,
          identifier,
        });
			}
			sendMail(token, receiverEmail);
      return await this.verificationTokenRepository.save(verificationTokenData);
    } catch (e) {
      console.error(e);
    }
  };
}

export default AuthenticationController;
