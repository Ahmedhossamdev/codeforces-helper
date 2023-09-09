import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {AtGuard} from "./common/guards";
import { ProblemsModule } from './problems/problems.module';

@Module({
  imports: [PrismaModule, AuthModule, ProblemsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide : APP_GUARD,
    useClass : AtGuard,
  }],
})
export class AppModule {}
