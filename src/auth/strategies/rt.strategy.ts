
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt , Strategy} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {Request} from "express";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy , 'jwt-refresh'){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request ,payload: any){
        const refreshToken = req.get('authorization').replace('Bearer','').trim();
        console.log({refreshToken});
        return {
            ...payload,
            refreshToken,
        }
    }
}