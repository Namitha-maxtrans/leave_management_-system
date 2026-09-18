import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class UpdateLeaveDto{
    @IsOptional()
    @IsString()
    @MaxLength(50)
    name?:string
    @IsOptional()
    @IsInt()
    @Min(0)
    annual_quota?:number
}