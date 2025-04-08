const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js")

const MONGO_URL="mongodb://127.0.0.1:27017/PlanMyTrip";

main()
.then(()=>{
    console.log("connected to db");
    
}).catch((err)=>{
console.log(err);

});

async function main() {
   await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:"67f16447a43f2cda14c14820"}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
    
};

initDB().then(()=>{
    console.log("data was initialized");
    
}).catch((err)=>{
    console.log(err);
    
});

