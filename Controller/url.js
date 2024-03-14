const URL=require('../models/url.js');
const shortid = require('shortid');

async function handleGenrateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is requried'});
     const ShortId=shortid.generate();

    await URL.create({
        shortId:ShortId,
        redirectedUrl:body.url,
        visitedHistory:[{timestamps:Date.now()}],
    });
    return res.render('home',{id:ShortId})
}


module.exports= {
    handleGenrateNewShortUrl
} 
