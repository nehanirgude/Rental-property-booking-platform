const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const Listing=require("./models/listing.js");

main().then((res=>{
  console.log("connection succesfull");
}))
.catch(err => console.log(err));

async function main() {
await mongoose.connect('mongodb://localhost:27017/wanderlust');

// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/",(req,res)=>{
    res.send("root is working");
});

app.get("/testListing")

app.listen(8080,()=>{
    console.log("app is listening to port 8080");
});