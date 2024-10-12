const express=require("express");
const app=express();
const mongoose=require('mongoose');
const Listing=require("./models/listing.js");

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

// app.get("/listings",(req,res)=>{
//   Listing.find({}).then((res)=>{
//     console.log(res);
//   });
// });

app.listen(8080,()=>{
    console.log("app is listening to port 8080");
});