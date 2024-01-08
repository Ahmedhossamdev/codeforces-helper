import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {getProblems} from "./modules/api/getProblems";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(){
    return getProblems(3500,3500);
  }
  getLists(){

  }
}
