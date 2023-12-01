import mongoose from "mongoose";

const Schema = mongoose.Schema

const faqSchema = new Schema({
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

export default mongoose.model('faq',faqSchema)