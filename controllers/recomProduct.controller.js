import multer from 'multer'
import { storage } from "../util/fileUpload"
import fs from 'fs'
import recomProductModel from '../models/recomProduct.model'
import mongoose, { Schema } from 'mongoose'


const upload = multer({storage:storage})

export const addproduct = async (req,res)=>{
    try{

        const uploadproductdata = upload.fields([
            {name:'thumbnail',maxCount:1},
            {name:'images',maxCount:10}
        ])

        uploadproductdata(req,res, async function(err){
            if(err){
                return res.status(400).json({
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

            const {title,longdescription,images,city,categoryId,facilitiesId,roomsId,highlightsId,itinerariesId,faqsId,suitabilityId,rating,ratingvalue,ratingtext,reviews,price,time} = req.body


            let facilitiesIdArray = null
            let roomsIdArray = null
            let highlightsIdArray = null
            let itinerariesIdArray = null
            let faqsIdArray = null
            let suitabilityIdArray = null

            if(facilitiesId){
                
                 facilitiesIdArray = facilitiesId.split(',');
            }
            
            if(roomsId){

                 roomsIdArray = roomsId.split(',');
            }
            if(highlightsId){

                 highlightsIdArray = highlightsId.split(',');
            }
            if(itinerariesId){

                 itinerariesIdArray = itinerariesId.split(',');
            }
            if(faqsId){

                 faqsIdArray = faqsId.split(',');
            }
            if(suitabilityId){

                 suitabilityIdArray = suitabilityId.split(',');
            }
            

            const product = new recomProductModel({
                title:title,
                longdescription:longdescription,
                thumbnail: thumbnailImage,
                images:imageArr,
                city:city,
                categoryId:categoryId,
                facilitiesId:facilitiesIdArray,
                roomsId:roomsIdArray,
                highlightsId:highlightsIdArray,
                itinerariesId:itinerariesIdArray,
                faqsId:faqsIdArray,
                suitabilityId:suitabilityIdArray,
                rating:rating,
                ratingvalue:ratingvalue,
                ratingtext:ratingtext,
                reviews:reviews,
                price:price,
                time:time
            })

            product.save()
            if(product){
                return res.status(201).json({
                    data:product,
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

export const getproducts = async(req,res)=>{
    try{

        const {search,searchid,page,size,minPrice,maxPrice} = req.query

        const skipno = (page-1)*size

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        
        
        if (searchid) {
            const categoryId = new mongoose.Types.ObjectId(searchid);
            filter = {
                ...filter,
                categoryId: categoryId
            };
        }
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

        
        if(minPrice && maxPrice){
            console.log('minPrice-',minPrice)
            filter.price={$gte:minPrice,$lte:maxPrice}
        }
        else if (minPrice) {
            filter.price = { $gte:minPrice};
          } 
          else if (maxPrice) {
            filter.price = { $lte:maxPrice};
          }

        const productdata = await recomProductModel.find(filter).populate([
            { path: 'categoryId' },
            { path: 'facilitiesId' },
            { path: 'roomsId' },
            { path: 'highlightsId' },
            { path: 'itinerariesId' },
            { path: 'faqsId' },
            { path: 'suitabilityId' },
          ])
          .limit(size)
          .skip(skipno);;


        if(productdata){
            return res.status(200).json({
                data:productdata,
                total:productdata.length,
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

export const getproduct =async (req,res) =>{

    try {
        
        const productID = req.params.product_id
  
        const getproduct =await recomProductModel.findOne({_id:productID}).populate([
            { path: 'categoryId' },
            { path: 'facilitiesId' },
            { path: 'roomsId' },
            { path: 'highlightsId' },
            { path: 'itinerariesId' },
            { path: 'faqsId' },
            { path: 'suitabilityId' },
        ])
  
    if(getproduct){
        return res.status(200).json({
            data:getproduct,
            message:'successfully get single product',
            filepath:`http://localhost:${process.env.PORT}/uploads`,

  
        })
    }
        
    } catch (error) {
  
        return res.status(500).json({
            message:error.message
        })
        
    }
  
    
  
  }

export const updateproducts = async (req, res) => {
    try {
      const uploadproductsData = upload.fields([
        {name:'thumbnail',maxCount:1},
        {name:'images',maxCount:10}
    ])
  
      uploadproductsData(req, res, async function (err) {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }

        const productId = req.params.product_id
        const { title,longdescription,city,categoryId,facilitiesId,roomsId,highlightsId,itinerariesId,faqsId,suitabilityId,rating,ratingvalue,ratingtext,reviews,price,time} = req.body;

  
        const existproducts = await recomProductModel.findOne({_id:productId});
  
        console.log(existproducts)
        let thumbnailImage = existproducts.thumbnail;   //single img
        let imageArr = existproducts.images || [];            // multi img

        
        
        if(req.files['thumbnail']){                   // to update single image
            thumbnailImage= req.files['thumbnail'][0].filename
  
            if(fs.existsSync('uploads/'+existproducts.thumbnail)){
              fs.unlinkSync('uploads/'+existproducts.thumbnail)
            }
        }



        if(req.files['images']){        // to update multiply images
        
          req.files['images'].forEach((image)=>{

              imageArr.push(image.filename);

              // console.log(imageArr)
          })
          
        }


  
        const updatePro = await recomProductModel.updateOne({_id:productId},{$set:{
            title:title,
            longdescription:longdescription,
            thumbnail:thumbnailImage,
            images:imageArr,
            city:city,
            categoryId:categoryId,
            facilitiesId:facilitiesId,
            highlightsId:highlightsId,
            itinerariesId:itinerariesId,
            faqsId:faqsId,
            suitabilityId:suitabilityId,
            roomsId:roomsId,
            rating:rating,
            ratingvalue:ratingvalue,
            ratingtext:ratingtext,
            reviews:reviews,
            price:price,
            time:time
        }})
  
        if (updatePro.matchedCount) {
          return res.status(200).json({
            message: "Updated",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const deletproduct = async(req,res)=>{
    try{

            const productId = req.params.product_ID
            
            const deleteproduct = await recomProductModel.updateOne({_id:productId},{$set:{
               
                status:0
            }})

            if(deleteproduct.acknowledged){
                return res.status(200).json({
                    message:'product deleted'
                })
            }
        

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}


export const removeproduct =async (req,res)=>{
    try{
        const productID = req.params.product_ID

        const productdata =await recomProductModel.findOne({_id:productID})


        if(productdata.images){
        const imgArr = productdata.images

          imgArr.forEach((img)=>{
            // console.log(img)
  
             if(fs.existsSync('uploads/'+img)){
                fs.unlinkSync('uploads/'+img)
            }
          })
        }



        if(fs.existsSync('uploads/'+productdata.thumbnail)){
            fs.unlinkSync('uploads/'+productdata.thumbnail)
        }

        const removeproduct =await recomProductModel.deleteOne({_id:productID})

        if(removeproduct.acknowledged){
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


