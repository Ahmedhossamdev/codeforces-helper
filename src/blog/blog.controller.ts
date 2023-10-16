import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {AddBlogDto} from "./dto/add-blog.dto";
import {GetCurrentUserId} from "../common/decorators";

@Controller('blogs')
export class BlogController {
    constructor(private readonly blogService: BlogService) {
    }


    @Post('add')
    @HttpCode(HttpStatus.OK)
    async addBlog(@Body() dto: AddBlogDto, @GetCurrentUserId() userId: number) {
        return await this.blogService.addBlog(dto, userId);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    async getAllBlogs() {
        return await this.blogService.getAllBlogs();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async getBlog(@Param('id') blogId: number) {
        const parsedBlogId = Number(blogId);
        return await this.blogService.getBlog(parsedBlogId);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.OK)
    async deleteBlog(@Param('id') blogId: number) {
        const parsedBlogId = Number(blogId);
        return await this.blogService.deleteBlog(parsedBlogId);
    }

    @Post('/:id/vote/:value')
    @HttpCode(HttpStatus.OK)
    async vote(@Param('value') voteValue: number , @Param('id') blogId: number, @GetCurrentUserId() userId: number) {
        const parsedBlogId = Number(blogId);
        const parsedValueId = Number(voteValue);
        return await this.blogService.vote(parsedBlogId, userId,parsedValueId);
    }

    // @Patch('/:id/vote')
    // @HttpCode(HttpStatus.OK)
    // async removeVote(@Param('id') blogId: number, @GetCurrentUserId() userId: number) {
    //     const parsedBlogId = Number(blogId);
    //     return await this.blogService.removeVote(parsedBlogId, userId);
    // }
}
