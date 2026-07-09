const employeeService = require('../services/employee.service');

class EmployeeController {
  async createEmployee(req, res, next) {
    try {
      const employee = await employeeService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEmployees(req, res, next) {
    try {
      const { pagination, data } = await employeeService.findAll(req.query);
      res.status(200).json({
        success: true,
        message: 'Employees retrieved successfully',
        pagination,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getEmployeeById(req, res, next) {
    try {
      const employee = await employeeService.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
          errors: [],
        });
      }
      res.status(200).json({
        success: true,
        message: 'Employee retrieved successfully',
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const employee = await employeeService.update(req.params.id, req.body);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
          errors: [],
        });
      }
      res.status(200).json({
        success: true,
        message: 'Employee updated successfully',
        data: employee,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(req, res, next) {
    try {
      const employee = await employeeService.delete(req.params.id);
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: 'Employee not found',
          errors: [],
        });
      }
      res.status(200).json({
        success: true,
        message: 'Employee deleted successfully',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EmployeeController();
