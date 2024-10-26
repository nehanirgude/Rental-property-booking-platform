const express=require("express");
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
// app.use(express.json());
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const {listingSchema,reviewSchema}=require("./schema.js");
// const wrapAsync=require("./utils/wrapAsync.js");
const Review=require("./models/review.js");

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


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


const wrapAsync = (fn) => {
  return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
  };
};


app.all("*",(req,res,next)=>{
  next(new ExpressError(404, "page not found"));
});

app.use((err,req,res,next)=>{
  let{statusCode=500,message="something went wrong"}=err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("err.ejs",{err});
 
});

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});