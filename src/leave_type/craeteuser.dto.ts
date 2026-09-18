import { IsInt, IsString } from "class-validator";



export class Createuserdto {
  
   
   
    @IsString()
    name: string;
  
    @IsInt()
    annual_quota:number
}