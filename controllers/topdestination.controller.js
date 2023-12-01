import multer from "multer"
import {storage} from '../util/fileUpload'
import topdestinationModel from "../models/topdestination.model"


const upload = multer({storage:storage})

export const adddestination =async (req,res)=>{
    try{
        const uploaddestination = upload.single('thumbnail')
        uploaddestination(req,res,async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message
                })
            }

            let thumb = null

            if(req.file){
                thumb=req.file.filename
            }

            const destinationData =await topdestinationModel.create({
                ...req.body,
                thumbnail:thumb
            })

            if(destinationData){
                return res.status(201).json({
                    data:destinationData,
                    message:'successfully created'
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

export const getdestinations= async(req,res)=>{
    try{
        const getdestinationData = await topdestinationModel.find()

        if(getdestinationData){
            return res.status(200).json({
                data:getdestinationData,
                total:getdestinationData.length,
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