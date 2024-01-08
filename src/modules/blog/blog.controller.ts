import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AddBlogDto } from './dto/add-blog.dto';
import { GetCurrentUserId } from '../common/decorators';
import { VoteDto } from './dto/vote-blog.dto';
import { VoteService } from '../votes/votes.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService, private readonly voteService: VoteService) {}
  
  @Post()
  async create(@Body() addBlogDto: AddBlogDto, @GetCurrentUserId() userId: number) {
    return await this.blogService.create(addBlogDto, userId);
  }

  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') blogId: string) {
    return await this.blogService.findOne(+blogId);
  }

  @Delete('/:id')
  async delete(@Param('id') blogId: string) {
    return await this.blogService.delete(+blogId);
  }

  @Post('/:id/vote')
  async vote(@Body() voteValue: VoteDto, @Param('id') blogId: string, @GetCurrentUserId() userId: number) {
    return await this.voteService.vote(+blogId, userId, voteValue);
  }
}
