import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';

@Module({
  providers: [ProblemsService],
  controllers: [ProblemsController]
})
export class ProblemsModule {}
