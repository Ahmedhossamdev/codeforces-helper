import { IsIn, IsInt } from 'class-validator';

export class VoteDto {
  @IsInt()
  @IsIn([1, -1, 0])
  value: number;
}
