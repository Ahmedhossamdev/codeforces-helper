import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthSignInDto, AuthSignUpDto} from "./dto";
import {Tokens} from "./typs";
import {RtGuard} from "../common/guards";
import {GetCurrentUser, GetCurrentUserId, Public} from "../common/decorators";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }
    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signUpLocal(@Body() dto: AuthSignUpDto): Promise<Tokens>{

       return this.authService.signUpLocal(dto)
    }
    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signInLocal(@Body() dto: AuthSignInDto):Promise<Tokens>{
        return this.authService.signInLocal(dto);
    }



    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@GetCurrentUserId() userId : number){
        return this.authService.logout(userId);
    }


    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId : number,
        @GetCurrentUser('refreshToken') refreshToken : string
    ){
        return this.authService.refreshTokens(userId , refreshToken);
    }
}
