import cartModel from "../models/cart.model"
import recomBookingRoomdetailModel from "../models/recomBookingRoomdetail.model"
import fs from 'fs'
import recomProductModel from "../models/recomProduct.model"

export const addToCart =async (req,res)=>{
    try {
        const {bookingid} = req.body

        
            // const userdata = req.cookies.userdata
            const booking = await recomBookingRoomdetailModel.findOne({_id:bookingid})

            const hotelid =booking.hotelid ? booking.hotelid.toString() :null
            const userid = booking.userid.toString()
            const roomid = booking.roomid ? booking.roomid.toString() :null
            
            console.log('booking-',booking)
            // console.log(userid)


            const existbooking = await cartModel.findOne({
                userid:booking.userid,
                bookingid:bookingid
            })

            if(existbooking){
                return res.status(200).json({
                    message:'booking already done'
                })
            }

            
             console.log('booking-',booking)
            const saveCart = new cartModel({
                userid:userid,
                // userid:userdata._id,
                bookingid:bookingid,
                hotelid:hotelid,
                roomid:roomid,
                bookingDate:booking.createdAt,
                cindate:booking.cindate,
                coutdate:booking.coutdate,
                nights:booking.nights,
                guests:booking.guests,
                rooms:booking.rooms,
                title:booking.title,
                city:booking.city,
                time:booking.time,
                location:booking.location,
                price:booking.price,
                
            })

            saveCart.save()

            if(saveCart){
                return res.status(200).json({
                    message:"Successfully added to cart"
                })
            }
       

        


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getCartData = async(req,res) =>{
    try{
        // const userdata = req.cookies.userdata
        // const cartItems = await cartModel.find({userid:userdata._id})


        // const {userid} = req.body
        // const cartItems = await cartModel.find({userid:userid})
        
        const cartItems = await cartModel.find({status:1}).populate([
            {path:'bookingid'},
            {path:'hotelid'},
            {path:'roomid'},
        ])


        if(cartItems){
            return res.status(200).json({
                data:cartItems,
                total:cartItems.length,
                filepath:`http://localhost:${process.env.PORT}/uploads`,
                message: "Successfully fetch",
                
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteCartitem =async (req,res) =>{

    try {
        
        const cartid = req.params.cartid

        const deletecart =await cartModel.updateOne({_id:cartid},{$set:{
            status:0
        }})

        if(deletecart.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } 
    catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}


export const removeCartItem = async (req,res) =>{
    try{
        const cartid = req.params.cartid

        const cartitem = await cartModel.findOne({_id:cartid})

       
        if(fs.existsSync('uploads/'+cartitem.thumbnail)){
            fs.unlinkSync('uploads/'+cartitem.thumbnail)
        }
        
        const deleteItem = await cartModel.deleteOne({_id:cartid})

        

        if(deleteItem.acknowledged){
            return res.status(200).json({
                message:'successfully delete'
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}