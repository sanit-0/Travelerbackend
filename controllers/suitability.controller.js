import multer from 'multer'
import { storage } from "../util/fileUpload"
import fs from 'fs'
import suitabilityModel from '../models/suitability.model'

const upload = multer({storage:storage})

export const addsuitability = async (req,res)=>{
    try{

        const uploadsuitabilitydata = upload.single('thumbnail')

        uploadsuitabilitydata(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

            let thumbnailImage = null

            if(req.file){
                thumbnailImage =  req.file.filename
            }
    
            const suitability = await suitabilityModel.create({
                ...req.body,
                thumbnail: thumbnailImage,
            })

            if(suitability){
                return res.status(201).json({
                    data:suitability,
                    message:"successfully created"
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

export const getsuitabilities = async(req,res)=>{
    try{

    
        const suitability = await suitabilityModel.find()

        if(suitability){
            return res.status(200).json({
                data:suitability,
                total:suitability.length,
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

export const getsuitability = async (req,res)=>{
    try{

        const suitabilityid = req.params.suitability_id

        const suitability = await suitabilityModel.findOne({_id:suitabilityid})

        if(suitability){
            return res.status(200).json({
                data:suitability,
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

export const updatesuitability = async (req,res)=>{
    try{


        const uploadsuitabilitydata = upload.single('thumbnail')

        uploadsuitabilitydata(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

                const suitabilityid = req.params.suitability_id

                const suitability = await suitabilityModel.findOne({_id:suitabilityid})

                let img = suitability.thumbnail

                if(req.file){
                    img= req.file.filename

                    if(fs.existsSync('./uploads/'+suitability.thumbnail)){
                        fs.unlinkSync('./uploads/'+suitability.thumbnail)
                    }

                }


                const {name} = req.body

                const updatedsuitability = await suitabilityModel.updateOne({_id:suitabilityid},{$set:{
                    name:name,
                    thumbnail:img
                }})

                if(updatedsuitability.acknowledged){
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

export const deletesuitability = async (req,res)=>{
    try{

        const suitabilityid = req.params.suitability_id

        const suitability = await recomFacilitiesModel.findOne({_id:suitabilityid})

        if(fs.existsSync('./uploads/'+suitability.thumbnail)){
            fs.unlinkSync('./uploads/'+suitability.thumbnail)
        }
        const deletedsuitability = await suitabilityModel.deleteOne({_id:suitabilityid})

        if(deletedsuitability.acknowledged){
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