const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review = require("./review.js");

const ListingSchema=new Schema({
    title:{
        type:String,
       
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
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],

});
ListingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.review}});
  }
});

const Listing=mongoose.model("Listing",ListingSchema);
module.exports=Listing;