import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsPublicRoute } from 'src/common/decorators';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
}
