const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get("/", homeController.home);
router.post("/", homeController.verifyToken);
router.use("/login", require("./login"));
router.use("/employee", require("./employee"));


module.exports = router;