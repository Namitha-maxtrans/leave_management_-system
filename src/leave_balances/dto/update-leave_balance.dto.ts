import {
  IsInt,
  IsOptional
 
} from 'class-validator';

export class UpdateLeaveBalanceDto {
  @IsOptional()
  @IsInt()

  employee_id?: number;

  @IsOptional()
  @IsInt()
 
  leave_type_id?: number;

  @IsOptional()
  @IsInt()
 
  allocated?: number;

  @IsOptional()

  used?: number;
}
