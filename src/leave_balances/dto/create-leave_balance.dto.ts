import {
  IsInt,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateLeaveBalanceDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  employee_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  leave_type_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  allocated: number;
}