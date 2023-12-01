import mongoose from "mongoose";

const Schema = mongoose.Schema

const formSchema = new Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    adline1:{
        type:String,
        default:null
    },
    adline2:{
        type:String,
        default:null
    },
    city:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    },
    zipcode:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
    message:{
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

export default mongoose.model('bookingform',formSchema)