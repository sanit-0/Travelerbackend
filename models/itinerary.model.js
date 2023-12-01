import mongoose from "mongoose";

const Schema = mongoose.Schema

const itinerarySchema = new Schema({
    acordday:{
        type:String,
        required:true
    },
    acordtitle:{
        type:String,
        required:true
    },
    acordbody:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        default:1
    }
})

export default mongoose.model('itinerary',itinerarySchema)