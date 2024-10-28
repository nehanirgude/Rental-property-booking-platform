const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing = require('../models/listing.js');



main().then((res=>{
    console.log("connection succesfull");
  }))
  .catch(err => console.log(err));
  
  async function main() {
  await mongoose.connect('mongodb://localhost:27017/wanderlust');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  

  const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"6531350a2543406980779aae"}));
    await Listing.insertMany(initData.data); //initData is object and we want to access key data of that object
    console.log("data was initialize");
  }

  // Listing.find().then((data)=>{
  //   console.log(data);
  // })

  initDB();
  