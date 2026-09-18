import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './updateemp.dto';
import { Createuserdto } from './createuser.dto';



@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly empService: EmployeeService,
  ) {}

  // 1. Get all employees
  @Get()
  getEmployees() {
    return this.empService.getEmployees();
  }

  // 2. Get employee by ID
  @Get(':id')
  getEmployeeById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.empService.getEmployeeById(id);
  }

  // 3. Create employee
  @Post()
  createEmployee(
    @Body() data: Createuserdto,
  ) {
    return this.empService.createEmployee(data);
  }

  // 4. Update employee
  @Put(':id')
  updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEmployeeDto,
  ) {
    return this.empService.updateEmployee(
      id,
      data,
    );
  }

  // 5. Partial update employee
  @Patch(':id')
  partialUpdateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateEmployeeDto,
  ) {
    return this.empService.updateEmployee(
      id,
      data,
    );
  }

  // 6. Delete employee
  @Delete(':id')
  deleteEmployee(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.empService.deleteEmployee(id);
  }
}