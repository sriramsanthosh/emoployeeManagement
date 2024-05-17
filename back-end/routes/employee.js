const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee_controller');

router.get("/", employeeController.list);
router.post("/create", employeeController.create);
router.get("/update", employeeController.get);
router.patch("/update", employeeController.update);
router.delete("/delete", employeeController.delete);



module.exports = router;