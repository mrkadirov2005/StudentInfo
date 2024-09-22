const express = require('express');
const router = express.Router();
const studentController=require("../controllers/studentController")

router.post('/add_student',studentController.add_student)
    

module.exports = router;