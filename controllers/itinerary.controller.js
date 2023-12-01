import itineraryModel from "../models/itinerary.model"

export const addToitinerary =async (req,res)=>{
    try {
        const {acordday,acordtitle,acordbody} = req.body
            
            const saveitinerary = new itineraryModel({
                acordday:acordday,
                acordtitle:acordtitle,
                acordbody:acordbody
                
            })

            saveitinerary.save()

            if(saveitinerary){
                return res.status(200).json({
                    data:saveitinerary,
                    message:"Successfully added to itinerary"
                })
            }  

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getitineraries = async(req,res) =>{
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

        const getdata = await itineraryModel.find(filter)

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