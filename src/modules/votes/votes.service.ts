import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogService } from '../blog/blog.service';
import { VoteDto } from '../blog/dto/vote-blog.dto';

@Injectable()
export class VoteService {
  constructor(private prismaService: PrismaService, private blogService: BlogService) {}

  

  // Get existing vote if user have voted before
  async getExistingVote(blogId: number, userId: number) {
    return await this.prismaService.vote.findFirst({
      where: {
        blogId: blogId,
        userId: userId,
      },
    });
  }


  // Calculate vote change
  /*
    1- if user not voted before voteChange = vote.value
    2- if user voted before and vote.value === existingVote.value voteChange undo vote = 0
    3- if user voted before and vote.value !== existingVote.value voteChange = 2 * vote.value
  */
  calculateVoteChange(vote: VoteDto, existingVote: any) {
    return (!existingVote || existingVote?.value === 0) ? vote.value :
    (vote.value === existingVote.value ? -vote.value : 2 * vote.value);
  }
  
  // Create or update vote
  async upsertVote(userId: number, blogId: number, vote: VoteDto, existingVote: any) {
    await this.prismaService.vote.upsert({
      where: {
        userId_blogId: {
          userId: userId,
          blogId: blogId,
        },
      },
      update: {
        value: vote.value === existingVote?.value ? 0 : vote.value,
      },
      create: {
        userId: userId,
        blogId: blogId,
        value: vote.value,
      },
    });
  }

  // Change totalVotes in blog
  async updateBlogVotes(blogId: number, voteChange: number) {
    await this.prismaService.blog.update({
      where: {
        id: blogId,
      },
      data: {
        totalVotes: {
          increment: voteChange,
        },
      },
    });
  }

    async vote(blogId: number, userId: number, vote: VoteDto) {

      let updatedBlog;
      await this.prismaService.$transaction(async (prisma) => {
        // Check if blogId exists?
        await this.blogService.findOne(blogId);
        // Check if user have voted before
        const existingVote = await this.getExistingVote(blogId, userId);
        // Calculate vote change
        const voteChange = this.calculateVoteChange(vote, existingVote);
        // Create or update vote
        await this.upsertVote(userId, blogId, vote, existingVote);
        // Change totalVotes in blog
        await this.updateBlogVotes(blogId, voteChange);
        // Get updated blog
        updatedBlog = await this.blogService.findOne(blogId);
      });

        return { ...updatedBlog };
    }
}