import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users/users.service';
import { User } from './users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validate(email: string, password): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    return user.password === password ? user : null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      id: user.userId
    };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: 'somesecret'
    });

    const user = this.usersService.getUserByEmail(decoded.email);

    return user;
  }
}
