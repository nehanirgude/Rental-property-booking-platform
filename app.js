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
const session=require("express-session");
const flash=require("connect-flash");

const listings=require("./routers/listing.js");
const reviews=require("./routers/review.js");


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
await mongoose.connect('mongodb://localhost:27017/wanderlust');

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sessionOptions={
  secret:"mysupersecretstring",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  },
};

app.get("/",(req,res)=>{
  res.send("hi, i am root");
});


app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  next();
});

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










