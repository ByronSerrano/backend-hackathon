import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
// import { User } from '../user/entities/user.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      const errorMessage = `User not found with this email ${email}`;
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const errorMessage = 'Invalid password  ';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async login(user: any) {
    try {
      const userData = await this.validateUser(user.email, user.password);

      const payload = {
        sub: userData.id,
        email: userData.email,
      };

      return {
        user: {
          id: userData.id,
          email: userData.email,
          name: userData.username, // Usar username como name
          role: userData.role,
        },
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      // See if the user was not found or the credentials are invalid
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.UNAUTHORIZED
      ) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException(
          'Internal server error: ' + error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

}
