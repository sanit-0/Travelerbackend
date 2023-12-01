import multer from 'multer'
import { storage } from "../util/fileUpload"
import recomFacilitiesModel from '../models/recomFacilities.model'
import fs from 'fs'

const upload = multer({storage:storage})

export const addfacility = async (req,res)=>{
    try{

        const uploadfacilitydata = upload.single('thumbnail')

        uploadfacilitydata(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

            let thumbnailImage = null

            if(req.file){
                thumbnailImage =  req.file.filename
            }
    
            const facility = await recomFacilitiesModel.create({
                ...req.body,
                thumbnail: thumbnailImage,
            })

            if(facility){
                return res.status(201).json({
                    data:facility,
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

export const getfacilities = async(req,res)=>{
    try{

    
        const facilitydata = await recomFacilitiesModel.find()

        if(facilitydata){
            return res.status(200).json({
                data:facilitydata,
                total:facilitydata.length,
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

export const getfacility = async (req,res)=>{
    try{

        const facilityid = req.params.facility_id

        const facility = await recomFacilitiesModel .findOne({_id:facilityid})

        if(facility){
            return res.status(200).json({
                data:facility,
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

export const updatefacility = async (req,res)=>{
    try{


        const uploadfacilitydata = upload.single('thumbnail')

        uploadfacilitydata(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

                const facilityid = req.params.facility_id

                const facility = await recomFacilitiesModel.findOne({_id:facilityid})

                let img = facility.thumbnail

                if(req.file){
                    img= req.file.filename

                    if(fs.existsSync('./uploads/'+facility.thumbnail)){
                        fs.unlinkSync('./uploads/'+facility.thumbnail)
                    }

                }


                const {name} = req.body

                const updatedfacility = await recomFacilitiesModel.updateOne({_id:facilityid},{$set:{
                    name:name,
                    thumbnail:img
                }})

                if(updatedfacility.acknowledged){
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

export const deletefacility = async (req,res)=>{
    try{

        const facilityid = req.params.facility_id

        const facility = await recomFacilitiesModel.findOne({_id:facilityid})

        if(fs.existsSync('./uploads/'+facility.thumbnail)){
            fs.unlinkSync('./uploads/'+facility.thumbnail)
        }
        const deletedfacility = await recomFacilitiesModel.deleteOne({_id:facilityid})

        if(deletedfacility.acknowledged){
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