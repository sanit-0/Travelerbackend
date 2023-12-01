import mongoose from "mongoose";

const Schema = mongoose.Schema

const suitabilitySchema = new Schema({        
    name:{
        type:String,
        default:null
    },
    thumbnail:{
        type:String,
        default:null
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

export default mongoose.model('suitability',suitabilitySchema)