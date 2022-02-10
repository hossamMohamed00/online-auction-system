import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../entities/user.schema';
import { UsersService } from '../users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Issue new jwt token contains some user info
   * @param user
   * @returns Object contains access_token
   */
  async login(user: UserDocument) {
    const payload: JwtPayload = { sub: user._id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
