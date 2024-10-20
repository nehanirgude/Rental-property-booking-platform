const express=require("express");
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
// app.use(express.json());
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const {listingSchema}=require("./schema.js");
// const wrapAsync=require("./utils/wrapAsync.js");

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


// app.get("/testListing",async(req,res)=>{

//   let sampleListing=new Listing({
//     title:"my new villa",
//     description:"by the beach",
//     price:1200,
//     location:"calangut,goa",
//     country:"india",
//   });
//   const mongoose = require('mongoose');



//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("succesfull testing");

// });


// app.get("/",(req,res)=>{
//   res.send("root is working");
// });


// //index route which will retrive all listings

// app.get("/listings",async(req,res)=>{
//    const allListings = await Listing.find({});
//    res.render("./listings/index.ejs",{allListings});
// });

// //create or new route

// app.get("/listings/new",(req,res)=>{
//   res.render("./listings/new.ejs");
// });


// //create route

// app.post("/listings/", async (req, res) => {
//   const newListing= new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
//   // Further processing...
// });



// // app.post("/listings",async(req,res)=>{
// //   // let {title,description,image,price,country,location} =req.body;

// //   let listing=req.body.listing;
// //   console.log(req.body);
  
// // });

// //show route-which will shows all the details of listing

// app.get("/listings/:id",async(req,res)=>{
//   let {id}=req.params;
//   const listing =await Listing.findById(id);
//   res.render("./listings/show.ejs",{listing});
// });

// //edit route

// app.get("/listings/:id/edit",async(req,res)=>{
//   let {id}=req.params;
//   const listing =await Listing.findById(id);
//   res.render("./listings/edit.ejs",{listing});
// });

// //update route

// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });

// //delete route

// app.delete("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// });

// app.listen(8080,()=>{
//     console.log("app is listening to port 8080");
// });
const wrapAsync = (fn) => {
  return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const validateListing=(req,res,next)=>{
  if(error){
    let errMsg=error.details.map((el)=> el.message).join(",");
    throw new ExpressError(400,err.errMsg);
  } else {
    next();
  }
}
//Index Route

app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
}));

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//Create Route
app.post("/listings",validateListing, wrapAsync(async(req,res,next) => {
 listingSchema.validate(req.body);
 console.log(result);
 if(result.error){
  throw new ExpressError(404,result.error);
 }
  const newListing = new Listing(req.body.listing);
  // if(!newListing.description){
  //   throw new ExpressError(400,"send valid data for listing");
  // }
  await newListing.save();
  res.redirect("/listings");
})
);

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));
//Update Route
app.put("/listings/:id",validateListing,wrapAsync(async (req, res) => {
  // if(!req.body.listing){
  //   throw new ExpressError(400,"send valid data for listing");
  // }
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
})) ;
//Delete Route
app.delete("/listings/:id",wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });

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