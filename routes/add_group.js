const express = require('express');
const router = express.Router();
const GroupConroller=require("../controllers/adminController")

router.post('/add_group',GroupConroller.add_Group)
    

module.exports = router;