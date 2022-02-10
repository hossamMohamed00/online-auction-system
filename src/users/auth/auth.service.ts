import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../entities/user.schema';
import { UsersService } from '../users.service';
import { JwtPayload } from './jwt-payload.interface';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Validate user credentials
   * @param email User email
   * @param password User password
   * @returns user instance if found || null if not found
   */
  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByEmail(email);
    //? Check if the password matches or not
    const isMatch = await compare(password, user.password);
    if (!isMatch) return null;

    return user;
  }

  /**
   * Issue new jwt token contains some user info
   * @param user
   * @returns Object contains access_token
   */
  async createJWTToken(user: UserDocument): Promise<{ access_token: string }> {
    const payload: JwtPayload = { sub: user._id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
