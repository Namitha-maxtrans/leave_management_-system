import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Emp } from '../employee/employee.entity';

@Entity('department')
export class Dept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Emp, (employee) => employee.dept)
  employees: Emp[];
}