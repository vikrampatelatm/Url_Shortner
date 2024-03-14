const express=require('express');
const {handleGenrateNewShortUrl}=require('../Controller/url.js')
const router=express.Router();

router.post('/',handleGenrateNewShortUrl);


module.exports=router;