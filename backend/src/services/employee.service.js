const Employee = require('../models/employee.model');

// Allowed fields for sorting (whitelist to prevent injection)
const SORTABLE_FIELDS = new Set([
  'firstName',
  'lastName',
  'salary',
  'joiningDate',
  'department',
  'createdAt',
  'status',
  'employeeId',
]);

class EmployeeService {
  /**
   * Build a MongoDB query from request query params.
   * Supports: search, department, status, designation, gender,
   *           salaryMin, salaryMax.
   */
  _buildFilter(query = {}) {
    const filter = {};

    // Full-text search across key fields using case-insensitive regex
    if (query.search && query.search.trim()) {
      const rx = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { firstName: rx },
        { lastName: rx },
        { employeeId: rx },
        { email: rx },
        { department: rx },
        { designation: rx },
      ];
    }

    // Exact-match filters
    if (query.department)  filter.department  = new RegExp(`^${query.department.trim()}$`, 'i');
    if (query.status)      filter.status      = new RegExp(`^${query.status.trim()}$`, 'i');
    if (query.designation) filter.designation = new RegExp(`^${query.designation.trim()}$`, 'i');
    if (query.gender)      filter.gender      = new RegExp(`^${query.gender.trim()}$`, 'i');

    // Salary range
    if (query.salaryMin || query.salaryMax) {
      filter.salary = {};
      if (query.salaryMin) filter.salary.$gte = Number(query.salaryMin);
      if (query.salaryMax) filter.salary.$lte = Number(query.salaryMax);
    }

    return filter;
  }

  /**
   * Build sort object. Defaults to createdAt descending.
   */
  _buildSort(query = {}) {
    const { sortBy = 'createdAt', sortOrder = 'desc' } = query;
    const field = SORTABLE_FIELDS.has(sortBy) ? sortBy : 'createdAt';
    const order = sortOrder === 'asc' ? 1 : -1;
    return { [field]: order };
  }

  /**
   * Build a Mongoose projection string from comma-separated field names.
   * Always includes _id unless explicitly excluded.
   */
  _buildProjection(query = {}) {
    if (!query.fields) return null;
    const fields = query.fields
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean)
      .join(' ');
    return fields || null;
  }

  /**
   * GET all employees with pagination, search, filter, sort, field selection.
   */
  async findAll(query = {}) {
    // Pagination defaults
    const page  = Math.max(1, parseInt(query.page)  || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
    const skip  = (page - 1) * limit;

    const filter     = this._buildFilter(query);
    const sort       = this._buildSort(query);
    const projection = this._buildProjection(query);

    // Run count and data fetch in parallel for performance
    const [totalEmployees, employees] = await Promise.all([
      Employee.countDocuments(filter),
      Employee.find(filter, projection).sort(sort).skip(skip).limit(limit).lean(),
    ]);

    const totalPages = Math.ceil(totalEmployees / limit);

    return {
      pagination: {
        currentPage:     page,
        pageSize:        limit,
        totalPages,
        totalEmployees,
        hasNextPage:     page < totalPages,
        hasPreviousPage: page > 1,
      },
      data: employees,
    };
  }

  async create(employeeData) {
    const employee = new Employee(employeeData);
    return await employee.save();
  }

  async findById(id) {
    return await Employee.findById(id);
  }

  async update(id, updateData) {
    return await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Employee.findByIdAndDelete(id);
  }
}

module.exports = new EmployeeService();
