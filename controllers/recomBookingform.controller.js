import recomBookingformModel from "../models/recomBookingform.model"


export const addbookingform = async (req,res)=>{
    try{
            

            const {fname,lname,email,mobile,adline1,adline2,city,state,zipcode,country,message} = req.body


            const bookingform = await recomBookingformModel.create({
                ...req.body
            })

            if(bookingform){
                return res.status(201).json({
                    data:bookingform,
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

export const getbookingforms = async(req,res)=>{
    try{

        const {search,page,size} = req.query

        const skipno = (page-1)*size

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        if(search){
            

            filter={
                ...filter,
                $or:[
                    {fname:{$regex:searchRgx , $options:"i"}},
                    {email:{$regex:searchRgx , $options:"i"}},                    
                ]
            }
            console.log(filter)
        }


        const roombookingformdata = await recomBookingformModel.find(filter)
          .limit(size)
          .skip(skipno);;


        if(roombookingformdata){
            return res.status(200).json({
                data:roombookingformdata,
                total:roombookingformdata.length,
                message:'successfully featch',

            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getbookingform =async (req,res) =>{

    try {
        
        const bookingformID = req.params.bookingform_id
  
        const bookingform =await recomBookingformModel.findOne({_id:bookingformID})
  
    if(bookingform){
        return res.status(200).json({
            data:bookingform,
            message:'successfully get form detail',

  
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


