const express=require("express");
const router=express.Router({mergeParams:true});
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/review.js");

// const wrapAsync = (fn) => {
//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next)).catch(next);
//     };
//   };


//reviws
//post Route

router.post("/",
  isLoggedIn,
  wrapAsync(reviewController.createReview));

  
  //delete review route
  
  router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,

    wrapAsync(reviewController.destroyReview )
  );
  

  module.exports=router;