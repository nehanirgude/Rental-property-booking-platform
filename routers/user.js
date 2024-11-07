const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");



// const { saveRedirectUrl } = require("../middleware.js");


const userContorller = require("../controllers/users.js");



// router.get("/signup",( userContorller.signup));


// router.get("/login",(req,res)=>{
//     res.render("users/login.ejs");
// });

// router.post("/login", 
//     saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect:'/login',
//         failureFlash:true
//     }),
// async(userContorller.renderLoginForm));

// router.get("/logout",(req,res)=>{
//     req.logout((err) => {
//         if(err) {
//            return next(err);
//         }
//         req.flash("success", "you are logged out now");
//         res.redirect("/listings");
//     });
// });

router
    .route("/signup")
 
    .get( userContorller.rendersignupForm)

  
    .post(wrapAsync( userContorller.signup ));


router
    .route("/login")
 
    .get( userContorller.renderLoginForm)

   
    .post( saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login", 
            failureFlash: true,
        }), 
        userContorller.login
    );


router.get("/logout", userContorller.logout);


module.exports = router;