import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthSignInDto, AuthSignUpDto} from "./dto";
import {Tokens} from "./typs";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {

    }
    @Post('/local/signup')
    signUpLocal(@Body() dto: AuthSignUpDto): Promise<Tokens>{

       return this.authService.signUpLocal(dto)
    }
    @Post('/local/signin')
    signInLocal(@Body() dto: AuthSignInDto):Promise<Tokens>{
        return this.authService.signInLocal(dto);
    }
    @Post('/logout')
    logout(){
        this.authService.logout();
    }
    @Post('/refresh')
    refreshTokens(){
        this.authService.refreshTokens()
    }
}
