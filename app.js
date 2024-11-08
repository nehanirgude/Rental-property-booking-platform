if (process.env.NODE_ENV != "production") {

  require("dotenv").config();
}

const dbUrl=process.env.ATLAS_DB
console.log(process.env.SECRET);

const express=require("express");
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
// app.use(express.json());
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const {listingSchema,reviewSchema}=require("./schema.js");
const wrapAsync=require("./utils/wrapAsync.js");
const Review=require("./models/review.js");
const User = require("./models/user.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const {isLoggedIn}=require("./middleware.js")

const listings=require("./routers/listing.js");
const reviews=require("./routers/review.js");
const users = require("./routers/user.js");


const ExpressError=require("./utils/ExpressError.js")


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);
//to use static files like css 
app.use(express.static(path.join(__dirname,"/public")));

  
main().then((res=>{
  console.log("connection succesfull");
}))
.catch(err => console.log(err));

async function main() {
await mongoose.connect(dbUrl);

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const store = MongoStore.create({
  mongoUrl: dbUrl, 
  crypto : {
      secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, 
});
store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: true,
};
app.use(session(sessionOptions));


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", users);

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

// const wrapAsync = (fn) => {
//   return (req, res, next) => {
//       Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };

app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message}); // Make sure this points to your error template
  
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});


// mongodb+srv://nehanirgude3:eRFdRLGMkxS7j0Lz@cluster0.r4n63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0







