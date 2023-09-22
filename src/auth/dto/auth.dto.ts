import {IsAlpha, IsEmail, IsNotEmpty, IsString, MinLength} from "class-validator";


export class AuthSignUpDto {

    @MinLength(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email : string;
    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    password:string;

    @MinLength(5)
    @IsString()
    @IsNotEmpty()
    passwordConfirm : string;
}

export class AuthSignInDto{

    @IsEmail()
    @IsNotEmpty()
    email : string;


    @IsString()
    @IsNotEmpty()
    password:string;
}