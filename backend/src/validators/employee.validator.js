const Joi = require('joi');

const validateEmployee = (req, res, next) => {
  const schema = Joi.object({
    employeeId: Joi.string().required().messages({
      'string.empty': 'Employee ID is required',
    }),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    dateOfBirth: Joi.date().iso().required(),
    department: Joi.string().required(),
    designation: Joi.string().required(),
    joiningDate: Joi.date().iso().required(),
    salary: Joi.number().min(0).required(),
    address: Joi.string().required(),
    status: Joi.string().valid('Active', 'Inactive', 'On Leave', 'Terminated').optional(),
    avatar: Joi.string().uri().optional().allow(null, ''),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors,
    });
  }

  next();
};

const validateEmployeeUpdate = (req, res, next) => {
  const schema = Joi.object({
    employeeId: Joi.string().optional(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().optional(),
    gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
    dateOfBirth: Joi.date().iso().optional(),
    department: Joi.string().optional(),
    designation: Joi.string().optional(),
    joiningDate: Joi.date().iso().optional(),
    salary: Joi.number().min(0).optional(),
    address: Joi.string().optional(),
    status: Joi.string().valid('Active', 'Inactive', 'On Leave', 'Terminated').optional(),
    avatar: Joi.string().uri().optional().allow(null, ''),
  }).min(1);

  const { error } = schema.validate(req.body, { abortEarly: false });
  
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors,
    });
  }

  next();
};

module.exports = {
  validateEmployee,
  validateEmployeeUpdate,
};
