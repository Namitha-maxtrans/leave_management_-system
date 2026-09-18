import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Emp } from '../../employee/employee.entity';
import { LeaveType } from '../../leave_type/leave.entity';

@Entity('leave_balances')
@Unique(['employee_id', 'leave_type_id'])
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee_id: number;

  @Column()
  leave_type_id: number;

  @Column()
  allocated: number;

  @Column({ default: 0 })
  used: number;

  @ManyToOne(() => Emp)
  @JoinColumn({ name: 'employee_id' })
  employee: Emp;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;
}