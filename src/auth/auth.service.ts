import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username, password);
    if (typeof user !== 'string') {
      if (user.role === 'ADMIN') {
        const result = user;
        return result;
      }
    }
    return null;
  }

  async login(data: any) {
    const user = await this.userService.getUser(data.username, data.password);
    if (typeof user !== 'string') {
      const payload = { username: user.username, role: user.role };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET_KEY,
        }),
      };
    } else {
      return "User doesn't exist";
    }
  }
}
