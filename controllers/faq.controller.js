import faqModel from "../models/faq.model"

export const addTofaq =async (req,res)=>{
    try {
        const {acordtitle,acordbody} = req.body
            
            const savefaq = new faqModel({
                acordtitle:acordtitle,
                acordbody:acordbody
                
            })

            savefaq.save()

            if(savefaq){
                return res.status(200).json({
                    message:"Successfully added to faqs"
                })
            }  

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getfaqs = async(req,res) =>{
    try{
        
        const {search} = req.query

        console.log(search)

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        if(search){
            filter={
                ...filter,
                acordtitle:{$regex:searchRgx , $options:"i"},
                    
                
            }
        }

        const getdata = await faqModel.find(filter)

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