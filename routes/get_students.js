const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.get('/get_students',adminContoller.get_students_data)
    

module.exports = router;