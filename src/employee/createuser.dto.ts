import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";




export class Createuserdto {
    @IsOptional()  //it is used to handle incoming data 
    @IsInt()
    id: number;
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsEmail()
    email:string;
    @IsInt()
    dept_id:number

}