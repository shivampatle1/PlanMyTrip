const express=require("express")
const router=express.Router();
const User =require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middelware.js");

const userController=require("../controllers/users.js")


router
.route("/signup")
.get(userController.renderSingup)
.post(wrapAsync (userController.singup))


router
.route("/login")
.get(userController.login)
.post(saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),
userController.loginRender)


router.get("/logout",userController.logout)

module.exports=router;