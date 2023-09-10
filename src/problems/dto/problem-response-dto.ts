import {DefaultArgs, GetFindResult} from "@prisma/client/runtime/library";
import {Prisma} from "@prisma/client";


export class ProblemResponseDto {
    id: number;
    name: string;
    url: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];


}
