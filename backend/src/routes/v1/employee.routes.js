const express = require('express');
const employeeController = require('../../controllers/employee.controller');
const { validateEmployee, validateEmployeeUpdate } = require('../../validators/employee.validator');

const router = express.Router();

router
  .route('/')
  .get(employeeController.getEmployees)
  .post(validateEmployee, employeeController.createEmployee);

router
  .route('/:id')
  .get(employeeController.getEmployeeById)
  .put(validateEmployeeUpdate, employeeController.updateEmployee)
  .delete(employeeController.deleteEmployee);

module.exports = router;
