const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn}=require("../middleware.js");

const Listing=require("../models/listing.js");

// const wrapAsync = (fn) => {
//   return (req, res, next) => {
//       Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };

const validateListing=(err,req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
      let errMsg=error.details.map((el)=> el.message).join(",");
      throw new ExpressError(400,err.errMsg);
    } else {
      next();
    }
  }



router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));
  
  //New Route
  router.get("/new",isLoggedIn,(req, res) => {
    
    res.render("/listing/new.ejs");
  });
  //Show Route
  router.get("/:id",wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    if(!listing){
      req.flash("error","listing you requested for does not exist!");
      req.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  }));
  
  //Create Route
  router.post("/",isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const result = listingSchema.validate(req.body); // Capture the result of validation
    if (result.error) {
        return next(new ExpressError(400, result.error.details[0].message)); // Pass the error to next()
    }
    
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    
    req.flash("success", "New Listing created");
    res.redirect("/listings");
}));
  //Edit Route
router.get("/:id/edit",isLoggedIn, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","listing you requested for does not exist!");
      req.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
  }));
  //Update Route
  router.put("/:id",isLoggedIn,validateListing,wrapAsync(async (req, res) => {
    // if(!req.body.listing){
    //   throw new ExpressError(400,"send valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "listing updated");
    res.redirect(`/listings/${id}`);
  })) ;
  //Delete Route
  router.delete("/:id",isLoggedIn,wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted");
    res.redirect("/listings");
  }));

  module.exports=router;