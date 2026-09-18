import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { LeaveTypeController } from './leave_type/leave_type.controller';
import { LeaveTypeService } from './leave_type/leave_type.service';
import { LeaveTypeModule } from './leave_type/leave_type.module';
import { LeaveBalancesModule } from './leave_balances/leave_balances.module';
import { ConfigModule } from '@nestjs/config';
import { LeaveRequestsModule } from './leave_requests/leave_requests.module';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'exam',
    }),
    DbModule,
    DepartmentModule,
    EmployeeModule,
    LeaveTypeModule,
    LeaveBalancesModule,
    LeaveRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
