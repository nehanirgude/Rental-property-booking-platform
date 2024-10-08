const mongoose=require(mongoose);
const Schema=mongoose.Schema;

const ListingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        set: (v) =>v ===""? "https://unsplash.com/photos/a-pool-of-water-surrounded-by-rocks-and-trees-zo_udYMcaVc":v,
    },
    price:Number,
    location:String,
    country:String,

});

const Listing=mongoose.model("Listing",ListingSchema);
module.export=Listing;