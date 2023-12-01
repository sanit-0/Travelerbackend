
import recomBookingRoomdetailModel from '../models/recomBookingRoomdetail.model'
import multer from "multer"
import path from "path";
import fs, { mkdir } from 'fs'
import { storage } from "../util/fileUpload";

const upload = multer({storage:storage})

export const addroombooking = async (req,res)=>{
    try{
        const uploadbookingData = upload.single("thumbnail");

        uploadbookingData(req,res,function(err){
            if(err){
                res.status(400).json({
                    message:err.message,
                })
            }  

            let img = null;

            if(req.file){
                img =req.file.filename
            }


            const {hotelid,roomid,userid,cindate,coutdate,nights,guests,rooms,title,city,time,location,price} = req.body

            

            const roombooking = new recomBookingRoomdetailModel({
                hotelid:hotelid,
                roomid:roomid,
                userid:userid,
                cindate:cindate,
                coutdate:coutdate,
                nights:nights,
                guests:guests,
                rooms:rooms,
                title:title,
                city:city,
                time:time,
                location:location,
                thumbnail:img,
                price:price
            })

            roombooking.save()
            if(roombooking){
                return res.status(201).json({
                    data:roombooking,
                    message:"successfully created"
                })
            }
       
        });
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getroombookings = async(req,res)=>{
    try{

        const {search,searchid,page,size} = req.query

        const skipno = (page-1)*size

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        if(search){
            

            filter={
                ...filter,
                $or:[
                    {title:{$regex:searchRgx , $options:"i"}},
                    {longdescription:{$regex:searchRgx , $options:"i"}},
                    {city:{$regex:searchRgx , $options:"i"}},
                    
                ]
            }
            console.log(filter)
        }


        const roombookingdata = await recomBookingRoomdetailModel.find(filter).populate([
            { path: 'hotelid' },
            { path: 'roomid' },
            {path:'userid'}
          ])
          .limit(size)
          .skip(skipno);;


        if(roombookingdata){
            return res.status(200).json({
                data:roombookingdata,
                total:roombookingdata.length,
                message:'successfully featch',
                filepath:`http://localhost:${process.env.PORT}/uploads`,

            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getroombooking =async (req,res) =>{

    try {
        
        const roombooking = req.params.roombooking_id
  
        const getroombooking =await recomBookingRoomdetailModel.findOne({_id:roombooking}).populate([
            { path: 'hotelid' },
            { path: 'roomid' },
            { path: 'userid' },
        ])
  
    if(getroombooking){
        return res.status(200).json({
            data:getroombooking,
            message:'successfully get single roombooking detail',
            filepath:`http://localhost:${process.env.PORT}/uploads`,

  
        })
    }
        
    } 
    catch (error) {
  
        return res.status(500).json({
            message:error.message
        })
        
    }

  }

// export const updateroombooking = async (req, res) => {
//     try {
    

//         const productId = req.params.product_id
//         const { title,longdescription,city,categoryId,facilitiesId,roomsId,rating,ratingvalue,ratingtext,reviews,price} = req.body;

  
//         const existproducts = await recomProductModel.findOne({_id:productId});
  
//         console.log(existproducts)
//         let thumbnailImage = existproducts.thumbnail;   //single img
//         let imageArr = existproducts.images || [];            // multi img

        
        
//         if(req.files['thumbnail']){                   // to update single image
//             thumbnailImage= req.files['thumbnail'][0].filename
  
//             if(fs.existsSync('uploads/'+existproducts.thumbnail)){
//               fs.unlinkSync('uploads/'+existproducts.thumbnail)
//             }
//         }



//         if(req.files['images']){        // to update multiply images
        
//           req.files['images'].forEach((image)=>{

//               imageArr.push(image.filename);

//               // console.log(imageArr)
//           })
          
//         }


  
//         const updatePro = await recomProductModel.updateOne({_id:productId},{$set:{
//             title:title,
//             longdescription:longdescription,
//             thumbnail:thumbnailImage,
//             images:imageArr,
//             city:city,
//             categoryId:categoryId,
//             facilitiesId:facilitiesId,
//             roomsId:roomsId,
//             rating:rating,
//             ratingvalue:ratingvalue,
//             ratingtext:ratingtext,
//             reviews:reviews,
//             price:price
//         }})
  
//         if (updatePro.matchedCount) {
//           return res.status(200).json({
//             message: "Updated",
//           });
//         }
     
//     } catch (error) {
//       return res.status(500).json({
//         message: error.message,
//       });
//     }
//   };

export const deleteroombooking = async(req,res)=>{
    try{

        const roombooking = req.params.roombooking_id

            
            const deleteroombooking = await recomBookingRoomdetailModel.updateOne({_id:roombooking},{$set:{
               
                status:0
            }})

            if(deleteroombooking.acknowledged){
                return res.status(200).json({
                    message:'booking deleted'
                })
            }
        

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}


export const removeroombooking =async (req,res)=>{
    try{
        const roombooking = req.params.roombooking_id


        const removeroombooking =await recomBookingRoomdetailModel.deleteOne({_id:roombooking})

        if(removeroombooking.acknowledged){
            return res.status(200).json({
                message:'deleted'
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })    
    }
}


