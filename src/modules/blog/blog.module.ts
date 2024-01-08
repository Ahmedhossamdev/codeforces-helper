import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogGateway } from './blog.gateway';
import { VoteService } from '../votes/votes.service';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogGateway, VoteService]
})
export class BlogModule {}
