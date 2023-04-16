import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport";
import { UsersService } from "../users/users.service";
import { ExtractJwt } from "passport-jwt";
import { User } from "../users/schema/user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtStrategy') {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'somesecret'
        })
    }

    async validate({ email }): Promise<User> {
        return await this.usersService.getUserByEmail(email);
    }
}