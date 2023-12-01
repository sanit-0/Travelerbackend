import multer from 'multer'
import { storage } from '../util/fileUpload'
import recomRoomsModel from '../models/recomRooms.model'
import fs from 'fs'


const upload = multer({storage:storage})    

export const addRooms = async (req,res)=>{
    try{
        const uploadrooms = upload.fields([
            {name:'thumbnail',maxCount:1},
            {name:'images',maxCount:10}
        ])

        uploadrooms(req,res,async  function(err){
            if(err){
                return res.status(500).json({
                    message:err.message
                })
            }

            
            let thumbnailImage = null
            let imageArr = []

            if(req.files['thumbnail']){
                thumbnailImage =  req.files['thumbnail'][0].filename
            }
            if(req.files['images']){
                req.files['images'].forEach((image)=>{
                    imageArr.push(image.filename)
                })
            }

            const {title,details,price,desciption,hotelId,facilitiesId}= req.body

           
                
            const facilitiesIdArray = facilitiesId.split(',');
            
            // console.log(facilitiesId)

            const roomsdata = new recomRoomsModel({
                title:title,
                details:details,
                price:price,
                desciption:desciption,
                hotelId:hotelId,
                facilitiesId:facilitiesIdArray,
                thumbnail:thumbnailImage,
                images:imageArr
            })

            roomsdata.save()

            console.log(roomsdata)
            if(roomsdata){
                return res.status(201).json({
                    data:roomsdata,
                    message:'Successsfully created'
                })
            }
        })
        

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getRooms = async(req,res)=>{
    try{

        const {search} = req.query


        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)
        const searchRgx = rgx(search);

        let filter={}
        if(search){
             filter.name={$regex:searchRgx , $options:"i"}
           
            
        }
        const Roomsdata = await recomRoomsModel.find(filter)

        if(Roomsdata){
            return res.status(200).json({
                data:Roomsdata,
                total:Roomsdata.length,
                filepath:`http://localhost:${process.env.PORT}/uploads`,
                message:'successfully featch'
            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getroom = async (req,res)=>{
    try{
        
        const roomid = req.params.room_id

        const rooms = await recomRoomsModel.findOne({_id:roomid}).populate('facilitiesId')

        if(rooms){
            return res.status(200).json({
                data:rooms,
                filepath:`http://localhost:${process.env.PORT}/uploads`,
                message:'successfully featch'
            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const updateroom = async (req,res)=>{
    try{


        const uploadroomsdata = upload.fields([
            {name:'thumbnail',maxCount:1},
            {name:'images',maxCount:10}
        ])

        uploadroomsdata(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

                const roomid = req.params.room_id

                const room = await recomRoomsModel.findOne({_id:roomid})


                let thumbnailImage = room.thumbnail;   //single img
                let imageArr = room.images || []; 
                
                if(req.files['thumbnail']){                   // to update single image
                    thumbnailImage= req.files['thumbnail'][0].filename
          
                    if(fs.existsSync('uploads/'+room.thumbnail)){
                      fs.unlinkSync('uploads/'+room.thumbnail)
                    }
                }
        
        
        
                if(req.files['images']){        // to update multiply images
                
                  req.files['images'].forEach((image)=>{
        
                      imageArr.push(image.filename);
        
                      // console.log(imageArr)
                  })
                  
                }


                const {title,details,price,desciption,hotelId,facilitiesId}= req.body

                let facilitiesIdArray= room.facilitiesId
                if(facilitiesId){
                    
                    facilitiesIdArray = facilitiesId.split(',');
                }

                const updatedroom = await recomRoomsModel.updateOne({_id:roomid},{$set:{
                    title:title,
                    details:details,
                    price:price,
                    desciption:desciption,
                    hotelId:hotelId,
                    facilitiesId:facilitiesIdArray,
                    thumbnail:thumbnailImage,
                    images:imageArr
                }})

                if(updatedroom.acknowledged){
                    return res.status(200).json({
                        message:'successfully update'
                    })
                }
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deleteroom = async (req,res)=>{
    try{

        const roomid = req.params.room_id

        const room = await recomRoomsModel.findOne({_id:roomid})

        if(room.images){
            const imgArr = room.images
    
              imgArr.forEach((img)=>{
                // console.log(img)
      
                 if(fs.existsSync('uploads/'+img)){
                    fs.unlinkSync('uploads/'+img)
                }
              })
            }

        if(fs.existsSync('./uploads/'+room.thumbnail)){
            fs.unlinkSync('./uploads/'+room.thumbnail)
        }
        const deletedroom = await recomRoomsModel.deleteOne({_id:roomid})

        if(deletedroom.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'
            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}