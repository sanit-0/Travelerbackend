import mongoose from "mongoose";
import recomBookingRoomdetailModel from "./recomBookingRoomdetail.model";
import userModel from "./user.model";
import recomProductModel from "./recomProduct.model";
import recomRoomsModel from "./recomRooms.model";

const Schema = mongoose.Schema

const cartSchema = new Schema({
    userid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:userModel
    },
    bookingid:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:recomBookingRoomdetailModel
    },
    hotelid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:recomProductModel
    },
    roomid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:recomRoomsModel
    },
    bookingDate:{
        type:String,
        default:null
    },
    thumbnail:{
        type:String,
        default:null,
    },  
    cindate:{
        type:String,
        default:null,
    },
    coutdate:{
        type:String,
        default:null,
    },
    nights:{
        type:Number,
        default:null,
    },
    guests:{
        type:Number,
        default:null,
    },
    rooms:{
        type:Number,
        default:null,
    },
    title:{
        type:String,
        default:null
    },
    city:{
        type:String,
        default:null
    },
    time:{
        type:String,
        default:null
    },
    price:{
        type:String,
        default:null
    },
    location:{
        type:String,
        default:null
    },
    paystatus:{
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

export default mongoose.model('cart',cartSchema)