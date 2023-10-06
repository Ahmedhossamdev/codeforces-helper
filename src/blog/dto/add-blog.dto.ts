import {IsString, IsNotEmpty} from 'class-validator';


export class AddBlogDto{
    @IsString()
    @IsNotEmpty()
    title : string;


    @IsString()
    @IsNotEmpty()
    content: string;

}