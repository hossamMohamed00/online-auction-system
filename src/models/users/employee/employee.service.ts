import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schema/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(body: any) {
    const employee = new this.employeeModel(body);
    await employee.save();

    return employee;
  }
  async findAll() {
    const employees = await this.employeeModel.find().exec();
    return employees;
  }
}
