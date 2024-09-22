const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.get('/get_dashboard_data',adminContoller.get_dashboard_data)
    

module.exports = router;