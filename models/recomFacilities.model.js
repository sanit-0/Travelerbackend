import mongoose from "mongoose";

const Schema = mongoose.Schema

const facilitiesSchema = new Schema({        
    thumbnail:{
        type:String,
        default:null
    },
    name:{
        type:String,
        default:null
    }, 
   
})

export default mongoose.model('recomfacility',facilitiesSchema)