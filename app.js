const express=require("express");
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
app.use(express.json());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));


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


app.get("/",(req,res)=>{
  res.send("root is working");
});


//index route which will retrive all listings

app.get("/listings",async(req,res)=>{
   const allListings = await Listing.find({});
   res.render("./listings/index.ejs",{allListings});
});

//create or new route

app.get("/listings/new",(req,res)=>{
  res.render("./listings/new.ejs");
});


//create route

app.post("/listings/listings", async (req, res) => {
  const newListing= new Listing(req.body.listing);
  await newListing.save();
  console.log(req.body);
  res.redirect("/listings");
  // Further processing...
});

// app.post("/listings",async(req,res)=>{
//   // let {title,description,image,price,country,location} =req.body;

//   let listing=req.body.listing;
//   console.log(req.body);
  
// });

//show route-which will shows all the details of listing

app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  const listing =await Listing.findById(id);
  res.render("./listings/show.ejs",{listing});
});









app.listen(8080,()=>{
    console.log("app is listening to port 8080");
});