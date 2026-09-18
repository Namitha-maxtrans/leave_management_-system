import { Column, Entity,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { LeaveBalance } from "../leave_balances/entities/leave_balance.entity";


@Entity('leave_types')
export class LeaveType{
@PrimaryGeneratedColumn()
id: number;
@Column()
name:string
@Column()
annual_quota:number
@OneToMany(
  () => LeaveBalance,
  (leaveBalance) => leaveBalance.leaveType,
)
leaveBalances: LeaveBalance[];
}