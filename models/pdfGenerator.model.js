import mongoose from "mongoose"
const Schema = mongoose.Schema

const pdfSchema = new Schema({
    title:{
        type:String,
        default:null
    },
    content:{
        type:Buffer,
        default:null
    },
    email:{
        type:String,
        default:null
    } 
})

export default mongoose.model('pdf',pdfSchema)