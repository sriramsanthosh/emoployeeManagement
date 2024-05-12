const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee_controller');

router.get("/", employeeController.list);
router.post("/create", employeeController.create);
router.get("/update", employeeController.update);



module.exports = router;