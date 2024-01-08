import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { AddProblemDto } from './dto';
import { GetCurrentUser, GetCurrentUserId } from '../common/decorators';

@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('add')
  @HttpCode(HttpStatus.OK)
  async addProblem(@Body() dto: AddProblemDto, @GetCurrentUserId() userId: number) {
    return await this.problemsService.addProblem(dto, userId);
  }
  @Get('problems-by-tags')
  async getProblemsByTags(@Query('tags') tags: string, @GetCurrentUserId() userId: number) {
    const tagsArray = tags.split(',');
    return await this.problemsService.getProblemsByTags(tagsArray, userId);
  }
}
