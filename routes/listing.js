const express = require("express")
const router=express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
//const { listingSchema, reviewSchema } = require("../schema.js");
//const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {isLoggedIn, isOwner,validateListing}=require('../middelware.js')
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})



const listingController=require("../controllers/listings.js")


router
       .route("/")
       .get( wrapAsync(listingController.index))
       .post(
       isLoggedIn,
       upload.single('listing[image]'),
       validateListing,
       wrapAsync(listingController.createListing ));

  


        //NEW ROUTE
        router.get("/new",isLoggedIn,listingController.renderNewForm);


router
    .route("/:id")

    .get(
    wrapAsync(listingController.showLisitng))

    .put( isLoggedIn,isOwner,upload.single("listing[image]"), validateListing,
     wrapAsync(listingController.updateListing))

    .delete(isOwner, wrapAsync(listingController.deleteListing))






//EDIT ROUTE
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))





module.exports=router;
