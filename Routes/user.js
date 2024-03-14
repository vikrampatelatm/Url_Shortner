const express = require('express');
const {handleUserSignUp,handleUserLogin} = require('../Controller/user')
const User =require('../models/user')
const router=express.Router();

router.post('/',handleUserSignUp)
router.post('/login',handleUserLogin)


module.exports=router;

