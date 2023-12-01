import mongoose from "mongoose";

const Schema = mongoose.Schema

const destinationSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    activities:{
        type:String,
        required:true
    },
    cars:{
        type:String,
        required:true
    },
    hotels:{
        type:String,
        required:true
    },
    rentals:{
        type:String,
        required:true
    },
    tours:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },

})

export default mongoose.model('topdestinaion',destinationSchema)