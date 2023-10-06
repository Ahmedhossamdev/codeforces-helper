import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AddBlogDto} from "./dto/add-blog.dto";
import { BlogGateway } from './blog.gateway'; // Import your WebSocket gateway

@Injectable()
export class BlogService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly blogGateway: BlogGateway, 
    ) {}

    async addBlog(dto: AddBlogDto, userId: number) {
        const newBlog = await this.prismaService.blogPost.create({
            data: {
                authorId: userId,
                title: dto.title,
                content: dto.content,
                votes: 0,
            },
        });

        // Notify connected clients about the new blog post
        this.blogGateway.handleNewBlogPost(newBlog);

        return newBlog;
    }
}
