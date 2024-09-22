const express = require('express');
const router = express.Router();
const TeacherController=require("../controllers/teacherController")

router.post('/add_teacher',TeacherController.add_teacher)
    

module.exports = router;