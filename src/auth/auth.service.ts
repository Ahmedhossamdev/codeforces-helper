import { ConflictException, ForbiddenException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AuthSignInDto, AuthSignUpDto} from "./dto";
import * as bcrypt from 'bcrypt';
import {Tokens} from "./typs";
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService, private jwtService: JwtService) {
    }

    hashData(data: string) {
        return bcrypt.hash(data, 10);
    }
    async createTokens(userId: number, email: string , name: string) {
        const [at , rt] = await  Promise.all([
            this.jwtService.signAsync({
                    sub: userId,
                    email,
                    name,
                },
                {
                    secret:process.env.JWT_SECRET,
                    expiresIn: 60 * 15,
                }
            ),
            this.jwtService.signAsync({
                    sub: userId,
                    email,
                    name,
                },
                {
                    secret:process.env.JWT_SECRET,
                    expiresIn: 60 * 60 * 24 * 7,
                }
            ),
    ]);
        return {
            access_token : at,
            refresh_token : rt,
        }

    }
    async updateRtHash(userId: number , rt:string){
        const hash = await this.hashData(rt);
        await this.prismaService.user.update({
            where:{
                id: userId,
            },
            data:{
                hashedRt:hash,
            }
        })
    }

    async signUpLocal(dto: AuthSignUpDto): Promise<Tokens> {

        const userExist = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {
                        email: dto.email,
                    },
                    {
                        name: dto.name,
                    },
                ],
            },
        });

        if (userExist) {
            if (userExist.email === dto.email) {
                throw new ConflictException('User with this email already exists');
            }
            else if (userExist.name === dto.name) {
                throw new ConflictException('User with this name already exists');
            }
        }
        if (dto.password !== dto.passwordConfirm) {
            throw new ConflictException('Passwords do not match');
        }
        const password = await this.hashData(dto.password);
        const newUser = await this.prismaService.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password,
            }
        });

        const tokens = await this.createTokens(newUser.id , newUser.email , newUser.name);
        await this.updateRtHash(newUser.id , tokens.refresh_token);
        return tokens;
    }

    async signInLocal(dto :AuthSignInDto) :Promise<Tokens>{
         const user = await this.prismaService.user.findUnique({
             where:{
                     email:dto.email,
             }
         })

        if (!user){
            throw new ForbiddenException("Access denied");
        }
        const passwordMatches = await bcrypt.compare(dto.password,user.password);
        if (!passwordMatches){
            throw new ForbiddenException("Access denied");
        }

        const tokens = await this.createTokens(user.id , user.email , user.name);
        await this.updateRtHash(user.id , tokens.refresh_token);
        return tokens;

    }

   async logout(userId : number) {
       await this.prismaService.user.updateMany({
           where:{
               id : userId,
               hashedRt:{
                   not: null,
               }
           },
           data:{
               hashedRt: null,
           }
       });
    }

    async refreshTokens(userId: number , rt:string) {
        const user = await this.prismaService.user.findUnique({
            where:{
                id: userId,
            }
        })
        if (!user || !user.hashedRt) {
            throw new ForbiddenException("Access Denied");
        }

        const rtMatches = bcrypt.compare(rt , user.hashedRt);
        console.log(rt);
        if (!rtMatches){
            throw new ForbiddenException('Access Denied');
        }
        const tokens = await this.createTokens(user.id , user.email , user.name);
        await this.updateRtHash(user.id , tokens.refresh_token);
        return tokens;
    }
}
