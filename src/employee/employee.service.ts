import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emp } from './employee.entity';
import { Createuserdto } from './createuser.dto';
import { UpdateEmployeeDto } from './updateemp.dto';
import { LeaveBalance } from './../leave_balances/entities/leave_balance.entity';
import { LeaveTypeService } from './../leave_type/leave_type.service';
import { LeaveBalancesService } from '../leave_balances/leave_balances.service';
import { LeaveType } from './../leave_type/leave.entity';




@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Emp)
    private readonly empRepository: Repository<Emp>,
    private readonly LeaveTypeService:LeaveTypeService,
    private readonly LeaveBalanceService: LeaveBalancesService,
  ) {}

  //  Get all employees
  async getEmployees() {
    return this.empRepository.find()
    //   relations: { dept: true }, it will give the dept table relation
    
  }

  //  Get employee by ID
  async getEmployeeById(id: number) {
    const employee = await this.empRepository.findOne({
      where: { id },
      
    });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    return employee;
  }

  //  Create employee
  async createEmployee(data: Createuserdto) {
    const existingEmployee =
      await this.empRepository.findOneBy({
        email: data.email,
      });

    if (existingEmployee) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const employee = this.empRepository.create({
      ...data,
      date_of_joining: new Date(),
    });

    const savedEmployee= await this.empRepository.save(employee);
  const leaveTypes = await this.LeaveTypeService.getLeaveTypes();

    //  Create leave balance for each leave type
    for (const leaveType of leaveTypes) {
      await this.LeaveBalanceService.create({
        employee_id: savedEmployee.id,
        leave_type_id: leaveType.id,
        allocated: leaveType.annual_quota,
      });
    }
 //  Return saved employee
  return savedEmployee;
  
  }

  //  Update employee
  async updateEmployee(
    id: number,
    data: UpdateEmployeeDto,
  ) {
    const employee =
      await this.empRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    // Check email only if email is provided
    if (data.email) {
      const existingEmployee =
        await this.empRepository.findOneBy({
          email: data.email,
        });

      if (
        existingEmployee &&
        existingEmployee.id !== id
      ) {
        throw new ConflictException(
          'Email already exists',
        );
      }
    }

    // Update only the provided fields
    Object.assign(employee, data);

    return this.empRepository.save(employee);
  }

  // 5. Delete employee
  async deleteEmployee(id: number) {
    const employee =
      await this.empRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    await this.empRepository.delete(employee);

    return {
      message: 'Employee deleted successfully',
    };
  }
}