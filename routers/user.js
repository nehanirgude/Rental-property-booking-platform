const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
// const { saveRedirectUrl } = require("../middleware.js");


// const userContorller = require("../controllers/users.js");



router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});

router.post("/signup",
    wrapAsync(async(req,res)=>{ 
        try{
            let {username,email,password}=req.body;
         const newUser= new User({email , username});
          const registeredUser=await User.register(newUser , password);
          console.log(registeredUser);

          req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","user was registered");
          res.redirect("/listings");
          });
          
          
        }
        catch(e){
            req.flash("error",e.message);
            res.redirect("/signup");
        }
    
}));


router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",passport.authenticate("local",{failureRedirect:'/local',failureFlash:true}),
async(req,res)=>{
    res.flash("welcome to wanderlust tou are logged in!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(res.locals.redirectUrl);


});

router.get("/logout",(req,re)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("you are logged out now");
    });
});

// router
//     .route("/signup")
 
//     .get( userContorller.rendersignupForm)

  
//     .post(wrapAsync( userContorller.signup ));


// router
//     .route("/login")
 
//     .get( userContorller.renderLoginForm)

   
//     .post( saveRedirectUrl,
//         passport.authenticate("local", {
//             failureRedirect: "/login", 
//             failureFlash: true,
//         }), 
//         userContorller.login
//     );


// router.get("/logout", userContorller.logout);


module.exports = router;