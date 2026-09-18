import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsPositive,
} from 'class-validator';

export class CreateLeaveRequestDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  employee_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  leave_type_id: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}