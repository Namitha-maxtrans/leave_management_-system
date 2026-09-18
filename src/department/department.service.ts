import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dept } from './dept.entity';
import { Createuserdto } from './createuser.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Dept)
    private readonly departmentRepository: Repository<Dept>,
  ) {}

  // GET ALL DEPARTMENTS
  async findAll(): Promise<Dept[]> {
    return await this.departmentRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  // GET DEPARTMENT BY ID
  async findOne(id: number): Promise<Dept> {
    const department =
      await this.departmentRepository.findOneBy({ id });

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${id} not found`,
      );
    }

    return department;
  }

  // CREATE DEPARTMENT
  async create(
    data: Createuserdto,
  ): Promise<Dept> {
    const existingDepartment =
      await this.departmentRepository.findOne({
        where: {
          name: data.name,
        },
      });

    if (existingDepartment) {
      throw new ConflictException(
        'Department with this name already exists',
      );
    }

    const department =
      this.departmentRepository.create(data);

    return await this.departmentRepository.save(
      department,
    );
  }

  // UPDATE DEPARTMENT
  async update(
    id: number,
    data:Createuserdto,
  ): Promise<Dept> {
    const department = await this.findOne(id);

    if (data.name && data.name !== department.name) {
      const existingDepartment =
        await this.departmentRepository.findOne({
          where: {
            name: data.name,
          },
        });

      if (
        existingDepartment &&
        existingDepartment.id !== id
      ) {
        throw new ConflictException(
          'Department with this name already exists',
        );
      }
    }

    Object.assign(department, data);

    return await this.departmentRepository.save(
      department,
    );
  }

  // DELETE DEPARTMENT
  async remove(
    id: number,
  ): Promise<{ message: string }> {
    const department = await this.findOne(id);

    await this.departmentRepository.remove(department);

    return {
      message: `Department with ID ${id} deleted successfully`,
    };
  }
}