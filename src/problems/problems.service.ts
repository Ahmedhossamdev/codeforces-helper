import { Injectable } from '@nestjs/common';
import {AddProblemDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";



@Injectable()
export class ProblemsService {


    constructor(private readonly prismaService: PrismaService) {

    }

    async addProblem(dto: AddProblemDto, userId: number) {
        const addProblem = await this.prismaService.problem.create({
            data: {
                userId,
                name: dto.name,
                text: dto.text,
                tags: {
                    connectOrCreate: dto.tags.map((tagName) => ({
                        where: { name: tagName },
                        create: { name: tagName },
                    })),
                },
            },
        });
        return addProblem;
    }

}
