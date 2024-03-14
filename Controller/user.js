const User=require('../models/user.js');


async function handleUserSignUp(req,res){
    const {name,email,password}=req.body;

    await User.create({
            name,
            email,
            password,
    });
    return res.redirect('signup');
}
async function handleUserLogin(req,res){
    const {email,password}=req.body; 
    const user=await User.findOne({email,password});
    console.log("user"+ user);
    if(!user){
        return res.render('login');
    }
    return res.redirect('/');
}


module.exports= {
    handleUserSignUp,
    handleUserLogin
} 