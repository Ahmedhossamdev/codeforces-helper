import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AddBlogDto} from "./dto/add-blog.dto";
import {BlogGateway} from './blog.gateway'; // Import your WebSocket gateway

@Injectable()
export class BlogService {

    constructor(
        private readonly prismaService: PrismaService,
        private readonly blogGateway: BlogGateway,
    ) {
    }

    async addBlog(dto: AddBlogDto, userId: number) {
        const newBlog = await this.prismaService.blogPost.create({
            data: {
                authorId: userId,
                title: dto.title,
                content: dto.content,
            },
        });

        return {
            status: true,
            content: {
                data: newBlog,
            },
        };
    }


    async getAllBlogs() {
        const blogs = await this.prismaService.blogPost.findMany({});
        return {
            status: true,
            content: {
                data: blogs
            }
        }
    }

    async getBlog(blogId: number) {
        const blog = await this.prismaService.blogPost.findUnique({
            where: {
                id: blogId,
            }
        });
        return {
            status: true,
            content: {
                data: blog
            }
        }
    }

    async deleteBlog(blogId: number) {
        await this.prismaService.blogPost.delete({
            where: {
                id: blogId
            }
        });
        return {
            status: true,
        };
    }

    async vote(blogId: number, userId: number, voteValue: number) {
        let voteSum = null;

        const existingVote = await this.prismaService.vote.findFirst({
            where: {
                blogPostId: blogId,
                userId: userId,
            },
        });

        if (existingVote) {
            if (existingVote.voteValue === voteValue) {
                await this.prismaService.vote.delete({
                    where: {
                        userId_blogPostId: {
                            userId: existingVote.userId,
                            blogPostId: existingVote.blogPostId,
                        },
                    },
                });

            }
            else {
                await this.prismaService.vote.update({
                    where: {
                        userId_blogPostId: {
                            userId: userId,
                            blogPostId: blogId,
                        },
                    },
                    data: {
                        voteValue: voteValue,
                    },
                });
            }

            voteSum = await this.prismaService.vote.aggregate({
                where: {
                    blogPostId: blogId,
                },
                _sum: {
                    voteValue: true,
                },
            });
        }

        else {
            await this.prismaService.vote.create({
                data: {
                    userId: userId,
                    blogPostId: blogId,
                    voteValue: voteValue,
                },
            });

            voteSum = await this.prismaService.vote.aggregate({
                where: {
                    blogPostId: blogId,
                },
                _sum: {
                    voteValue: true,
                },
            });
        }

        return {
            status: true,
            content: {
                votes:voteSum._sum.voteValue,
            },
        };
    }
}
