const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ListingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    filename: String,
    url: String,
    image:{
        type:Object,
        default:"https://unsplash.com/photos/a-pool-of-water-surrounded-by-rocks-and-trees-zo_udYMcaVc",
        set: (v) =>v ===""? "https://unsplash.com/photos/a-pool-of-water-surrounded-by-rocks-and-trees-zo_udYMcaVc":v,
    },
    price:Number,
    location:String,
    country:String,

});

const Listing=mongoose.model("Listing",ListingSchema);
module.exports=Listing;