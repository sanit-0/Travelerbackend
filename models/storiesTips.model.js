import mongoose from "mongoose";

const Schema = mongoose.Schema

const storiesTipsSchema = new Schema({
    btntext:{
        type:String,
        required:true
    },
})