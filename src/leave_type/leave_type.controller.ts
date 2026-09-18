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
import { LeaveTypeService } from './leave_type.service';
import { Createuserdto } from './craeteuser.dto';
import { UpdateLeaveDto } from './updateleave.dto';



@Controller('leave-type')
export class LeaveTypeController {
  constructor(
    private readonly leaveTypeService: LeaveTypeService,
  ) {}

  // 1. Get all leave types
  @Get()
  getLeaveTypes() {
    return this.leaveTypeService.getLeaveTypes();
  }

  // 2. Get leave type by ID
  @Get(':id')
  getLeaveTypeById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.leaveTypeService.getLeaveTypeById(id);
  }

  // 3. Create leave type
  @Post()
  createLeaveType(
    @Body() data: Createuserdto,
  ) {
    return this.leaveTypeService.createLeaveType(data);
  }

  // 4. Update leave type
  @Put(':id')
  updateLeaveType(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateLeaveDto,
  ) {
    return this.leaveTypeService.updateLeaveType(
      id,
      data,
    );
  }

  // 5. Partial update leave type
  @Patch(':id')
  partialUpdateLeaveType(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateLeaveDto,
  ) {
    return this.leaveTypeService.updateLeaveType(
      id,
      data,
    );
  }

  // 6. Delete leave type
  @Delete(':id')
  deleteLeaveType(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.leaveTypeService.deleteLeaveType(id);
  }
}