const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.get('/get_groups',adminContoller.get_groups_data)
    

module.exports = router;