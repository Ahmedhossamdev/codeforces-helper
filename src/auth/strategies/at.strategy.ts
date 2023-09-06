
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt , Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";



type JwtPayload = {
    sub:string,
    email:string,
    name:string,
}
@Injectable()

export class AtStrategy extends PassportStrategy(Strategy , 'jwt'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET,
        });
    }
    validate(payload: JwtPayload){

        return payload;
        // req.user = payload
    }
}