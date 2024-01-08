import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogService } from '../blog/blog.service';
import { VoteDto } from '../blog/dto/vote-blog.dto';

// TODO: change vote value to enum type
@Injectable()
export class VoteService {
  constructor(
    private prismaService: PrismaService,
    private blogService: BlogService,
  ) {}

  // Check if user voted before
  async getExistingVote(blogId: number, userId: number) {
    const vote = await this.prismaService.vote.findFirst({
      where: {
        blogId: blogId,
        userId: userId,
      },
    });

    return vote;
  }

  async vote(blogId: number, userId: number, vote: VoteDto) {
    // Check if blog exists
    await this.blogService.findOne(blogId);

    // Check if user have voted before
    const existingVote = await this.getExistingVote(blogId, userId);

    // Update vote value
    const updatedVote = await this.prismaService.vote.upsert({
      where: {
        userId_blogId: {
          userId: userId,
          blogId: blogId,
        },
      },
      create: {
        userId: userId,
        blogId: blogId,
        value: vote.value,
      },
      update: {
        value: vote.value === existingVote?.value ? 0 : vote.value,
      },
    });

    return { updatedVote };
  }
}
