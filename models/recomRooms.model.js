import mongoose from "mongoose";
import recomFacilitiesModel from "./recomFacilities.model";

const Schema = mongoose.Schema

const roomsSchema = new Schema({        
    title:{
        type:String,
        default:null
    },
    thumbnail:{
        type:String,
        default:null
    }, 
    images:{
        type:Array,
        default:[]
    },
    details:{     
        type:String,
        default:null
    
    },
    price:{
        type:String,
        default:null
    },
    desciption:{
        type:String,
        default:null
    },
    // hotelname:{
    //     type:String,
    //     default:null
    // },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: 'recomproduct'
      },
    facilitiesId:[{
        type:Schema.Types.ObjectId,
        default:null,
        ref:recomFacilitiesModel
    }], 
    

   
})

export default mongoose.model('recomroom',roomsSchema)