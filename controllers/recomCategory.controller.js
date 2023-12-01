import recomCategoryModel from "../models/recomCategory.model"

export const addcategory = async (req,res)=>{
        try{
            

            const category = await recomCategoryModel.create({
                ...req.body
            })

            if(category){
                return res.status(201).json({
                    data:category,
                    message:"successfully created"
                })
            }

        }
        catch(error){
            return res.status(500).json({
                message:error.message
            })
        }
}

export const getcategories = async (req,res)=>{
    try{

        const categorydata = await recomCategoryModel.find()

        if(categorydata){
            return res.status(200).json({
                data:categorydata,
                total:categorydata.length,
                message:"successfully featch"
            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getcategory = async (req,res)=>{
    try{

        const categoryid = req.params.category_id

        const category = await recomCategoryModel.findOne({_id:categoryid})

        if(category){
            return res.status(200).json({
                data:category,
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

export const updatecategory = async (req,res)=>{
    try{

        const categoryid = req.params.category_id

        const {title} = req.body

        const updatedcategory = await recomCategoryModel.updateOne({_id:categoryid},{$set:{
            title:title
        }})

        if(updatedcategory.acknowledged){
            return res.status(200).json({
                message:'successfully update'
            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const deletecategory = async (req,res)=>{
    try{

        const categoryid = req.params.category_id

        const deletedcategory = await recomCategoryModel.deleteOne({_id:categoryid})

        if(deletedcategory.acknowledged){
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
