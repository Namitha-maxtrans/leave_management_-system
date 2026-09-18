import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dept } from './dept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dept])],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
