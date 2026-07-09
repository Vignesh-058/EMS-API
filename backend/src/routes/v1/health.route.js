const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    uptime: process.uptime(),
    version: '1.0.0',
    message: 'Health check passed',
    timestamp: new Date().toISOString()
  });
});
module.exports = router;
