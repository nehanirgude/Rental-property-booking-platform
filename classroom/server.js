const express=require("express");
const app=express();
const users=require("./routes/users.js");
const posts=require("./routes/post.js");
const cookieParser=require("cookie-parser");
const path = require('path');
// const postRoutes = require(path.join(__dirname, 'routes', 'post.js','users.js'));
app.use(cookieParser());


app.get("/getcoockies",(req,res)=>{
    res.cookie("great","hello");
    res.send("sent you some cookies");
})
app.get('/',(req,res)=>{
    res.send("hi,i am root");
});

app.use("/users",users);
app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});