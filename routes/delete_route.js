const express = require('express');
const router = express.Router();
const adminContoller=require("../controllers/adminController")

router.post('/delete',adminContoller.delete_stuff)
    

module.exports = router;