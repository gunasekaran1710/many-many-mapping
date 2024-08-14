const controller=require('../controller/userController');
const express=require('express');
router=express.Router();
router.post('/createstudent',controller.createstudent);
router.get('/viewstudent',controller.viewstudent);
router.get('/viewcourse',controller.viewcourse);
module.exports=router;