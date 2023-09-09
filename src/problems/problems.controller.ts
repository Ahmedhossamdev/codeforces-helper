import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {ProblemsService} from "./problems.service";
import {AddProblemDto} from "./dto";
import {GetCurrentUserId} from "../common/decorators";


@Controller('problems')
export class ProblemsController {
    constructor(private readonly problemsService: ProblemsService) {}

    @Post('addproblem')
    @HttpCode(HttpStatus.OK)
    addProblem(@Body() dto : AddProblemDto , @GetCurrentUserId() userId : number){
        return this.problemsService.addProblem(dto , userId);
    }

    //@Get('getproblem')
}
