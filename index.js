const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const URL=require('./models/url.js')

const app=express();
const PORT=8000;

const urlRouter=require('./Routes/url.js');
const staticRoute=require('./Routes/staticRouter.js');
const UserRoute=require('./Routes/user.js');


app.listen(PORT,()=>{
    console.log(`server running at port:${PORT}`);
})

mongoose.connect("mongodb+srv://123:123@cluster0.fqgqmux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("DB Conected");
})

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.get('/test',async (req,res)=>{
    const allUrls=await URL.find({});
    return res.render('home',{
       urls:allUrls,
    });
});

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use('/url',urlRouter)
app.use('/',staticRoute)
app.use('/user',UserRoute);
  




app.get('/url/:shortid',async (req,res)=>{
    const shortId=req.params.shortid;
    const entry=await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push:
       {
         visitedHistory: {
            timestamp: Date.now()
            }
        }
   })
    res.redirect(entry.redirectedUrl)
 });

app.get('/AT/:shortId',async (req,res)=>{
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalclicks:result.visitedHistory.length,
        analytics:result.visitedHistory
    })
})
