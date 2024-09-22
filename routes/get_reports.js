const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.get('/get_admin_reports',adminContoller.get_reports)
    

module.exports = router;