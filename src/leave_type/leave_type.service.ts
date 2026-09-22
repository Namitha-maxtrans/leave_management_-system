import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveType } from './leave.entity';
import { Createuserdto } from './craeteuser.dto';
import { UpdateLeaveDto } from './updateleave.dto';
@Injectable()
export class LeaveTypeService {
  constructor(
    @InjectRepository(LeaveType)
    private readonly leaveTypeRepository: Repository<LeaveType>,
  ) {}

  // 1. Get all leave types
  async getLeaveTypes() {
    return this.leaveTypeRepository.find();
  }

  // 2. Get leave type by ID
  async getLeaveTypeById(id: number) {
    const leaveType =
      await this.leaveTypeRepository.findOneBy({
        id,
      });

    if (!leaveType) {
      throw new NotFoundException(
        'Leave type not found',
      );
    }

    return leaveType;
  }

  // 3. Create leave type
  async createLeaveType(data: Createuserdto) {
    const existingLeaveType =
      await this.leaveTypeRepository.findOneBy({
        name: data.name,
      });

    if (existingLeaveType) {
      throw new ConflictException(
        'Leave type already exists',
      );
    }

    const leaveType =
      this.leaveTypeRepository.create(data);

    return this.leaveTypeRepository.save(leaveType);
  }

  // 4. Update leave type
  async updateLeaveType(
    id: number,
    data: UpdateLeaveDto,
  ) {
    const leaveType =
      await this.leaveTypeRepository.findOneBy({
        id,
      });

    if (!leaveType) {
      throw new NotFoundException(
        'Leave type not found',
      );
    }

    // Check duplicate name if name is provided
    if (data.name) {
      const existingLeaveType =
        await this.leaveTypeRepository.findOneBy({
          name: data.name,
        });

      if (
        existingLeaveType &&
        existingLeaveType.id !== id
      ) {
        throw new ConflictException(
          'Leave type already exists',
        );
      }
    }

    // Update provided fields
    Object.assign(leaveType, data);

    return this.leaveTypeRepository.save(leaveType);
  }

  // 5. Delete leave type
  async deleteLeaveType(id: number) {
    const leaveType =
      await this.leaveTypeRepository.findOneBy({
        id,
      });

    if (!leaveType) {
      throw new NotFoundException(
        'Leave type not found',
      );
    }
    await this.leaveTypeRepository.delete(id);

    return {
      message: 'Leave type deleted successfully',
    };
  }
}