const mongoose=require('mongoose');
const review = require('./review');
const { urlencoded } = require('express');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    // image:{
    //     type:String,
    //     default:"https://www.pexels.com/photo/grayscale-photo-of-a-person-surfing-on-the-ocean-7904726/",
    //     set:(v)=> v===""?"https://www.pexels.com/photo/grayscale-photo-of-a-person-surfing-on-the-ocean-7904726/":v,
    // },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"


        }
    ],
owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
}

});



listingSchema.post("findOneAndDelete", async(listing)=>{
    if (listing) {
    await review.deleteMany({_id:{$in:listing.reviews}})
        
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;