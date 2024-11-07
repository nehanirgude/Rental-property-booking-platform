const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Review = require("./review.js");
const { required } = require('joi');

const ListingSchema=new Schema({
    title:{
        type:String,
       
    },
    description:String,
    filename: String,
    url: String,
    image:{
        url: String,
       filename: String,
    },
    price:Number,
    location:String,
    country:String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: 
        {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
        geometry:{
            type:{
                type:String,
                enum:['Point'],
                required:true
            },
            coordinates:{
                type:[Number],
                required:true,
            }
        }


 
});



ListingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.review}});
  }
});

const Listing=mongoose.model("Listing",ListingSchema);
module.exports=Listing;