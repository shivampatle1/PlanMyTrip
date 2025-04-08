const User=require("../models/user")

module.exports.renderSingup=(req,res)=>{
    res.render("users/signup.ejs")
};

module.exports.singup=async(req,res)=>{
    try {
        let {username,email,password}=req.body
    const newUser=new User({email,username})
    const registerduser=await User.register(newUser,password)
    console.log(registerduser);
    req.login(registerduser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","account created in plan my trip!")
        res.redirect("/listings")
    })
 } catch (error) {
       req.flash('error',error.message) 
       res.redirect("/signup")
    }
};

module.exports.login=(req,res)=>{
    res.render("users/login.ejs")
};

module.exports.loginRender=async (req,res)=>{
    req.flash("success","Back to Plan my trip! You are logged in") 
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
 };


 module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next()
        }
        req.flash("success","you are logged Out!")
        res.redirect("/listings")
    })
};