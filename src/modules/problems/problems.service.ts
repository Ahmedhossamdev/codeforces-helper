import { Injectable } from '@nestjs/common';
import {AddProblemDto, ProblemResponseDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";



@Injectable()
export class ProblemsService {


    constructor(private readonly prismaService: PrismaService) {

    }



    async addProblem(dto: AddProblemDto, userId: number) {


             // math , dp
            const createdProblem = await this.prismaService.problem.create({
                data: {
                    userId: userId,
                    name: dto.name,
                    text: dto.text,
                    url: dto.url,
                    tags: {
                        create: dto.tags.map(tagName => ({ tagName })),
                    },
                },
            });
            return createdProblem;
    }

    async getProblemsByTags(tags: string[], userId: number) : Promise<ProblemResponseDto[]> {
            const problems = await this.prismaService.problem.findMany({
                where: {
                    userId: userId,
                    tags: {
                        some: {
                            tagName: {
                                in: tags,
                            },
                        },
                    },
                },
                include: {
                    tags: true,
                },
             });


        const response: ProblemResponseDto[] = problems.map((problem) => ({
            id: problem.id,
            name: problem.name,
            url: problem.url,
            text: problem.text,
            createdAt: problem.createdAt,
            updatedAt: problem.updatedAt,
            tags: problem.tags.map((tag) => tag.tagName),
        }));
        return response;
    }

}
