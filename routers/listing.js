const express=require("express");
const router=express.Router();
const ExpressError=require("../utils/ExpressError.js");
const wrapAsync=require("../utils/wrapAsync.js");
const {listingSchema}=require("../schema.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const Listing=require("../models/listing.js");
const listingController=require("../controllers/listing.js");

const multer = require("multer"); 
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); 


// const wrapAsync = (fn) => {
//   return (req, res, next) => {
//       Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };



router          
    .route("/")
    .get( wrapAsync (listingController.index)) //Index Route 
    .post(   //create route
        isLoggedIn,
        upload.single("listing[image]"),   
        validateListing,  
        wrapAsync(listingController.createListing)
    );


  //New Route
  router.get("/new",isLoggedIn,listingController.renderNewForm);

  router
    .route("/:id")
    .get( wrapAsync (listingController.showListing))  //Show route
    .put(  //update route
        isLoggedIn,
        isOwner,
        // upload.single("listing[image]"),   
        validateListing, 
        wrapAsync(listingController.updateListing)
    )
    .delete(  //delete route
        isLoggedIn,  
        isOwner,
        wrapAsync(listingController.destroyListing)
    );
  
  

  //Edit Route
router.get("/:id/edit",isLoggedIn,
  isOwner,
   wrapAsync(listingController.renderEditForm));
  
  module.exports=router;