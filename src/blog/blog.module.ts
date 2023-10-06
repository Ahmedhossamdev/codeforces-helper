import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogGateway } from './blog.gateway';

@Module({
  controllers: [BlogController],
  providers: [BlogService, BlogGateway]
})
export class BlogModule {}
