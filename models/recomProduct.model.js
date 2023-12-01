import mongoose from "mongoose";
import recomFacilitiesModel from "./recomFacilities.model";
import recomRoomsModel from "./recomRooms.model";
import recomCategoryModel from "./recomCategory.model";
import highlightsModel from "./highlights.model";
import itineraryModel from "./itinerary.model";
import faqModel from "./faq.model";
import suitabilityModel from "./suitability.model";

const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    longdescription:{
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
    city:{
        type:String,
        default:null
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:recomCategoryModel
    },
    facilitiesId:[{
        type:Schema.Types.ObjectId, 
        default:null,
        ref:recomFacilitiesModel
    }],  
    roomsId:[{
        type:Schema.Types.ObjectId,
        default:null,
        ref:recomRoomsModel
    }],
    highlightsId:[{
        type:Schema.Types.ObjectId,
        default:null,
        ref:highlightsModel
    }],
    itinerariesId:[{
        type:Schema.Types.ObjectId,
        default:null,
        ref:itineraryModel
    }],
    faqsId:[{
        type:Schema.Types.ObjectId,
        default:null,
        ref:faqModel
    }],
    suitabilityId:[{
        type:Schema.Types.ObjectId,
        default:null,
        ref:suitabilityModel
    }],
    rating:{
        type:Number,
        default:null
    },
    ratingvalue:{
        type:String,
        default:null
    },
    ratingtext:{
        type:String,
        default:null
    },
    reviews:{
        type:String,
        default:null
    },
    price:{
        type:String,
        default:null
    },
    time:{
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

export default mongoose.model('recomproduct',productSchema)