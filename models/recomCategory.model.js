import mongoose from "mongoose";

const Schema = mongoose.Schema

const categorySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    
})

export default mongoose.model('recomcategory',categorySchema)