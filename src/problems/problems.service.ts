import { Injectable } from '@nestjs/common';
import {AddProblemDto} from "./dto";
import {PrismaService} from "../prisma/prisma.service";
//import {TagEnum} from '@prisma/client';


@Injectable()
export class ProblemsService {


    constructor(private readonly prismaService: PrismaService) {

    }

    // async addProblem(dto : AddProblemDto , userId){
    //
    //     const selectedTags = tags.map(tagName => {
    //         if (TagEnum[tagName]) {
    //             return TagEnum[tagName];
    //         } else {
    //             throw new Error(`Invalid tag: ${tagName}`);
    //         }
    //     });
    //     const newProblem = await this.prismaService.problem.create({
    //         data :{
    //             userId,
    //             name: dto.name,
    //             text: dto.text,
    //             tags: selectedTags,
    //         }
    //     })
    // }


}
