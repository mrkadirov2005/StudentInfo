const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.get('/get_teachers',adminContoller.get_teachers_data)
    

module.exports = router;