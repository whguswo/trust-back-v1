import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from 'src/user/dto/login.dto';
import * as bcrypt from 'bcrypt';

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

  async login(data: loginDto) {
    const user = await this.userService.getUserByUsername(data.username);
    if (typeof user === 'object') {
      const result = await bcrypt.compare(data.password, user.password);
      if (!result) return false;
      const payload = { username: user.username, role: user.role };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: process.env.JWT_SECRET_KEY,
        }),
      };
    } else {
      return false;
    }
  }
}
