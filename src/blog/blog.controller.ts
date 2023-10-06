import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {BlogService} from "./blog.service";
import {AddBlogDto} from "./dto/add-blog.dto";
import {GetCurrentUserId} from "../common/decorators";

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}


  @Post('add')
  @HttpCode(HttpStatus.OK)
  async addBlog(@Body() dto : AddBlogDto , @GetCurrentUserId() userId: number){
     return await this.blogService.addBlog(dto , userId);
  }

}
