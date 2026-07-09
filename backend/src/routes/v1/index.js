const express = require('express');
const healthRoute = require('./health.route');

const employeeRoute = require('./employee.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health',
    route: healthRoute,
  },
  {
    path: '/employees',
    route: employeeRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
