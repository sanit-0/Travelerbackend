import highlightsModel from "../models/highlights.model"

export const addTohighlight =async (req,res)=>{
    try {
        const {title} = req.body
            
            const savehighlight = new highlightsModel({
                title:title
                
            })

            savehighlight.save()

            if(savehighlight){
                return res.status(200).json({
                    message:"Successfully added to highlights"
                })
            }
       

        


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const gethighlights = async(req,res) =>{
    try{
        
        const {search} = req.query

        // console.log(search)

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        if(search){
            filter={
                ...filter,
                title:{$regex:searchRgx , $options:"i"},
                    
                
            }
        }

        const getdata = await highlightsModel.find(filter)

        if(getdata){
            return res.status(200).json({
                data:getdata,
                total:getdata.length,
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

// export const deleteCartitem =async (req,res) =>{

//     try {
        
//         const cartid = req.params.cartid

//         const deletecart =await cartModel.updateOne({_id:cartid},{$set:{
//             status:0
//         }})

//         if(deletecart.acknowledged){
//             return res.status(200).json({
//                 message:'successfully deleted'

//             })
//         }
        
//     } 
//     catch (error) {

//         return res.status(500).json({
//             message:error.message
//         })
        
//     }

    

// }


// export const removeCartItem = async (req,res) =>{
//     try{
//         const cartid = req.params.cartid

//         const cartitem = await cartModel.findOne({_id:cartid})

       
//         if(fs.existsSync('uploads/'+cartitem.thumbnail)){
//             fs.unlinkSync('uploads/'+cartitem.thumbnail)
//         }
        
//         const deleteItem = await cartModel.deleteOne({_id:cartid})

        

//         if(deleteItem.acknowledged){
//             return res.status(200).json({
//                 message:'successfully delete'
//             })
//         }
//     }
//     catch (error) {
//         return res.status(500).json({
//             message:error.message
//         })
//     }
// }