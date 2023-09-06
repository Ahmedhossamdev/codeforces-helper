import {Strategy} from "passport";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt} from "passport-jwt";
import {Injectable} from "@nestjs/common";
@Injectable()

export class AtStrategy extends PassportStrategy(Strategy , 'jwt'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET,
        });
    }
    validate(payload: any){
        return payload;
        // req.user = payload
    }
}