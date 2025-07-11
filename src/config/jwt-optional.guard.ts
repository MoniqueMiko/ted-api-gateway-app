import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtOptionalGuard extends AuthGuard('jwt') {
    handleRequest(err, user) {
        if (err || !user) {
            return null
        }
        return user;
    }
}