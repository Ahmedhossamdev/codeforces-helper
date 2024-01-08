import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddBlogDto } from './dto/add-blog.dto';
import { BlogGateway } from './blog.gateway'; // Import your WebSocket gateway
import { VoteDto } from './dto/vote-blog.dto';
import { Public } from 'src/modules/common/decorators';
import { escape } from 'querystring';

@Injectable()
export class BlogService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly blogGateway: BlogGateway,
  ) {}

  async create(addBlogDto: AddBlogDto, userId: number) {
    const newBlog = await this.prismaService.blog.create({
      data: {
        ...addBlogDto,
        authorId: userId,
      },
    });

    return { data: newBlog };
  }

  async findAll() {
    const blogs = await this.prismaService.blog.findMany({
      include: {
        votes: {
          select: {
            value: true,
          },
        },
      },
    });

    // const transformedBlogs = blogs.map((blog) => {
    //   const sum = blog.votes.reduce((accumulator, vote) => accumulator + vote.value, 0);
    //   return {
    //     ...blog,
    //     votes: sum,
    //   };
    // });

    return { data: blogs };
  }

  async findOne(blogId: number) {
    const blog = await this.prismaService.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        votes: {
          select: {
            value: true,
          },
        },
      },
    });

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    const votes = blog.votes.reduce((accumulator, vote) => accumulator + vote.value, 0);

    return { data: { ...blog, votes } };
  }

  async delete(blogId: number) {
    await this.prismaService.blog.delete({
      where: {
        id: blogId,
      },
    });
    return {
      status: true,
    };
  }

  // async vote(blogId: number, userId: number, vote: VoteDto) {
  //   await this.prismaService.$transaction(async (prisma) => {
  //     // 1) Get the blog
  //     const blog = await prisma.blog.findUnique({
  //       where: {
  //         id: blogId,
  //       },
  //     });

  //     // 2) Check if blog exists
  //     if (!blog) {
  //       throw new NotFoundException('Blog not found');
  //     }

  //     // 3) Check if user have voted before
  //     const existingVote = await prisma.vote.findFirst({
  //       where: {
  //         blogId: blogId,
  //         userId: userId,
  //       },
  //     });

  //     let voteChange = 0;

  //     // If the user has not voted before, the change is simply the vote value
  //     if (!existingVote || existingVote?.value === 0) {
  //       voteChange = vote.value;
  //     }
  //     else if (vote.value === existingVote.value) {
  //       // If the user is submitting the same vote, neutralize the vote
  //       voteChange = -vote.value;
  //     }
  //     else {
  //       // If the user is changing their vote, the change is the absolute difference between the new vote and the existing vote
  //       voteChange = 2 * vote.value;
  //     }

  //     // Use upsert to either update existing vote or create a new one
  //     await prisma.vote.upsert({
  //       where: {
  //         userId_blogId: {
  //           userId: userId,
  //           blogId: blogId,
  //         },
  //       },
  //       update: {
  //         value: vote.value === existingVote?.value ? 0 : vote.value,
  //       },
  //       create: {
  //         userId: userId,
  //         blogId: blogId,
  //         value: vote.value,
  //       },
  //     });

  //     // Update the total votes for the blog
  //     await prisma.blog.update({
  //       where: {
  //         id: blogId,
  //       },
  //       data: {
  //         totalVotes: {
  //           increment: voteChange,
  //         },
  //       },
  //     });
  //   });

  //   // Get the updated blog with the total votes
  //   const updatedBlog = await this.prismaService.blog.findUnique({
  //     where: {
  //       id: blogId,
  //     },
  //     select: {
  //       totalVotes: true,
  //     },
  //   });

  //   return { data: updatedBlog };
  // }
}

// if (existingVote) {
//     if (existingVote.value === value) {
//       await this.prismaService.vote.delete({
//         where: {
//           userId_blogPostId: {
//             userId: existingVote.userId,
//             blogPostId: existingVote.blogPostId,
//           },
//         },
//       });
//     }
//     else {
//       await this.prismaService.vote.update({
//         where: {
//           userId_blogPostId: {
//             userId: userId,
//             blogPostId: blogId,
//           },
//         },
//         data: {
//           value: value,
//         },
//       });
//     }

//     voteSum = await this.prismaService.vote.aggregate({
//       where: {
//         blogPostId: blogId,
//       },
//       _sum: {
//         value: true,
//       },
//     });
//   } else {
//     await this.prismaService.vote.create({
//       data: {
//         userId: userId,
//         blogPostId: blogId,
//         value: value,
//       },
//     });

//     voteSum = await this.prismaService.vote.aggregate({
//       where: {
//         blogPostId: blogId,
//       },
//       _sum: {
//         value: true,
//       },
//     });
//   }

// if (!blog) {
//   throw new NotFoundException('Blog not found');
// }

// if (vote.value !== 1 && vote.value !== -1 && vote.value !== 0) {
//   throw new BadRequestException('Invalid vote value');
// }

// // Check if vote exists
// const existingVote = await prisma.vote.findFirst({
//   where: {
//     blogId: blogId,
//     userId: userId,
//   },
// });

// // Use upsert to either update existing vote or create a new one
// await prisma.vote.upsert({
//   where: {
//     userId_blogId: {
//       userId: userId,
//       blogId: blogId,
//     },
//   },
//   update: {
//     value: vote.value === existingVote?.value ? 0 : vote.value,
//   },
//   create: {
//     userId: userId,
//     blogId: blogId,
//     value: vote.value,
//   },
// });
// });

// // Aggregate vote sum after the transaction is committed
// const voteSum = await this.prismaService.vote.aggregate({
// where: {
//   blog: {
//     id: blogId,
//   },
// },
// _sum: {
//   value: true,
// },
// });

// return { data: voteSum._sum.value };
