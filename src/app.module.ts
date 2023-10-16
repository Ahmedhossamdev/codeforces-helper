import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {AtGuard} from "./common/guards";
import { ProblemsModule } from './problems/problems.module';
import { BlogModule } from './blog/blog.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [PrismaModule, AuthModule, ProblemsModule, BlogModule ,EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, {
    provide : APP_GUARD,
    useClass : AtGuard,
  }],
})
export class AppModule {}
