import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { DepartmentService } from './department.service';

import { Createuserdto } from './createuser.dto';

@Controller('department')
export class DepartmentController {
  constructor(
    private readonly deptService: DepartmentService,
  ) {}

  // GET ALL DEPARTMENTS
  @Get()
  findAll() {
    return this.deptService.findAll();
  }

  // GET DEPARTMENT BY ID
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deptService.findOne(id);
  }

  // CREATE DEPARTMENT
  @Post()
  create(
    @Body() data: Createuserdto,
  ) {
    return this.deptService.create(data);
  }

  // UPDATE DEPARTMENT
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Createuserdto,
  ) {
    return this.deptService.update(id, data);
  }

  // DELETE DEPARTMENT
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.deptService.remove(id);
  }
}