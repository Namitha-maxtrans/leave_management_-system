import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeaveRequestStatus } from "../leave_requeststatus";
import { Emp } from "../../employee/employee.entity";
import { LeaveType } from "../../leave_type/leave.entity";
@Entity('leave_requests')
export class LeaveRequest {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    employee_id:number
    @Column()
    leave_type_id:number
    @Column({type:'date'})
    start_date:string
    @Column({type:'date'})
    end_date:string
    @Column()
    days_count:number
    @Column({type:"text"})
    reason:string
     @Column({
    type: 'enum',
    enum: LeaveRequestStatus,
    default: LeaveRequestStatus.PENDING,
  })
  status: LeaveRequestStatus;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Emp)
  @JoinColumn({ name: 'employee_id' })
  employee: Emp;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leave_type_id' })
  leaveType: LeaveType;
}

