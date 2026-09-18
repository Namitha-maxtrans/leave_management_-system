import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Dept } from '../department/dept.entity';
import { LeaveBalance } from '../leave_balances/entities/leave_balance.entity';

@Entity('employee')
export class Emp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  date_of_joining: Date;

  @Column()
  dept_id: number;

  @ManyToOne(() => Dept, (department) => department.employees)
  @JoinColumn({ name: 'dept_id' })
  dept: Dept;
  @OneToMany(
    () => LeaveBalance,
    (leaveBalance) => leaveBalance.employee,
  )
  leaveBalances: LeaveBalance[];

}