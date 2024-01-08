import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserExistsMiddleware implements NestMiddleware {
  constructor(private readonly prismaService: PrismaService) {}
  async use(req: Request & { sub: string }, res: Response, next: NextFunction) {
    if (!req.user['sub']) {
      throw new InternalServerErrorException('User not found');
    }
    next();
  }
}
