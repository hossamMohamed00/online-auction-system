import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from '../types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    //? Setup JWT Options
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_TOKEN_SECRET')
    });
  }

  /**
   * The return value of this method will be assigned to req.user
   * @param payload :JwtPayload
   * @returns user instance
   */
  async validate({ sub }: JwtPayload) {
    const user = await this.usersService.findById(sub);
    if (!user) throw new ForbiddenException('Access Denied ❌');

    return user;
  }
}
