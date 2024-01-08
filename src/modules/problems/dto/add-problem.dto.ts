import {IsString, IsArray, IsNotEmpty} from 'class-validator';


export class AddProblemDto{


    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    url: string
    @IsString()
    @IsNotEmpty()
    text: string

      @IsArray()
     tags: string[];
}