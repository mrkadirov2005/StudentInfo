const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.post('/edit',adminContoller.edit_stuff)
    

module.exports = router;