import bcrypt from 'bcrypt'
import userModel from "../models/user.model"
import jwt from 'jsonwebtoken'
import multer from 'multer';
import { storage } from '../util/fileUpload';
import fs from 'fs'
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer'
import otpModel from '../models/otp.model';
// import otpModel from '../models/otp.model';


const upload = multer({storage:storage})



export const signUp = async(req,res)=>{
    try{
        const {fullname,email,password,contact,username} = req.body

        const existuser = await userModel.findOne({email:email});

        if(existuser){
            return res.status(200).json({
                message:'user already exist'
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);


        const SaveUser = new userModel({
            fullname:fullname,
            email:email,
            password:hashedPassword,
            contact:contact,
            username:username
        })

        SaveUser.save()

        if(SaveUser){
            return res.status(200).json({
                message:'Successfully signup'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const login = async(req,res)=>{
    try{
        const {email,username,password} = req.body

        const checkuser ={
            $or:[
                {email:email},
                {username:username}
            ]
        }

        const existUser =await userModel.findOne(checkuser)

        if(!existUser){
            return res.status(200).json({
                message:"User doesn't exist"
            })
        }

        const checkPassword = bcrypt.compareSync(password,existUser.password)

        if(!checkPassword){
            return res.status(200).json({
                message:"Invalide credential"
            })
        }

        const token = jwt.sign(
            {
                id:existUser._id,
                email:existUser.email
            },
            process.env.TOKEN_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie("userdata",existUser)
        console.log(existUser)

        return res.status(200).json({
            data:existUser,
            token:token,
            filepath:`http://localhost:${process.env.PORT}/uploads`,
            message:"Login successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

// export const logout = async(req,res)=>{
//     try{

//         res.clearCookie('userdata')

//     }
//     catch(err){
//         return res.status(500).json({
//             message:err.message
//         })
//     }
// }

export const getusers =async (req,res)=>{
    try {

        const {search}=req.query
        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchrgx = rgx(search)

        let filter= {status:1}

        if(search){
            filter={
                ...filter,
                $or:[
                    {name:{$regex:searchrgx , $options:"i"}},
                    {email:{$regex:searchrgx , $options:"i"}},
                ]
            }

        }
        const getuserdata = await userModel.find(filter)

        if(getuserdata){

            return res.status(200).json({
                data:getuserdata,
                total:getuserdata.length,
                filepath:`http://localhost:${process.env.PORT}/uploads`,
                message:'successfully fetch'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getuser = async(req,res)=>{
    try {
        const userid =req.params.userID

        const getuserdata =await userModel.findOne({_id:userid})

        if(getuserdata){
            return res.status(200).json({
                data:getuserdata,
                filepath:`http://localhost:${process.env.PORT}/uploads`,
                message:'single user data'
            })
        }
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const updateUser = async(req,res)=>{
    try {

        const uploaduserdata =upload.single('thumbnail')

        uploaduserdata(req,res,async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message
                })
            }
            const userid =req.params.userID
    
            const existUser= await userModel.findOne({_id:userid})

            let img = existUser.thumbnail

            if(req.file){
                img = req.file.filename

                if(fs.existsSync('./uploads/'+existUser.thumbnail)){
                    fs.unlinkSync('./uploads/'+existUser.thumbnail)
                }
            }

            const {fullname,email,password,contact,username} = req.body


            let hashedPassword = existUser.password; 

            if (password) {
                hashedPassword = bcrypt.hashSync(password, 10);
            }

            const updated =await userModel.updateOne({_id:userid},{$set:{
                fullname:fullname,
                email:email,
                password:hashedPassword,
                contact:contact,
                username:username,
                thumbnail:img
            }})
    
            
            if(updated.acknowledged){
                return res.status(200).json({
                    message:'Updated'
                })
            }
        })
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const deleteuser =async (req,res) =>{

    try {
        
        const userID = req.params.userID

        const deleteuser =await userModel.updateOne({_id:userID},{$set:{
            status:0
        }})

        if(deleteuser.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } 
    catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}

export const removeuser =async (req,res) =>{

    try {
        
        const userID = req.params.userID


        const userdata = await userModel.findOne({_id:userID})

        if(fs.existsSync('uploads/'+userdata.thumbnail)){
            fs.unlinkSync('uploads/'+userdata.thumbnail)
        }

        const removeuser =await userModel.deleteOne({_id:userID})

        if(removeuser.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}


export const sendotp = async(req,res)=>{    //sends otp to email and save in database
    try{
        
        const {email,contact} = req.body

        const filter ={
            $or:[
                {email:email},
                {contact:contact}
            ]
        }
        
        const existUser = await userModel.findOne(filter)

        if(!existUser){
            return res.status(400).json({
                message:"User doesn't exist"
            })
        }

        const OTP = otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets:false, 
            specialChars: false 
       });

       const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user:'sanittrycatch@gmail.com',
          pass: 'yhon yakz huts veyc'

        }
      });

       if(contact){
            console.log(contact)
            const accountSid = 'AC5b77d09f7b80320908564aff8462ff44';
            const authToken = '6d8efa586d34ed8b133990e4c5104340';
            
            const client = twilio(accountSid, authToken);
            
            client.messages
            .create({
                body: `Your OTP for login is: ${OTP}`,
                to: '+91'+contact, // Text your number
                from: '+12055649895', // From a valid Twilio number
            })

            const checkuser = await otpModel.findOne({email:existUser.email})

          if(checkuser){
              const updateOtp = await otpModel.updateOne({_id:checkuser.id},{$set:{
                  otp:OTP,
                  createdAt:new Date()
              }})
  
          }
          else{
  
              const saveotp = new otpModel({
                      email:existUser.email,
                      otp:OTP
              })
                saveotp.save()
          }

            return res.status(200).json({
                message:'OTP send successfully. '
            })

            
       
       }
       else{
        const info = await transporter.sendMail({
            from: 'sanittrycatch@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Your OTP for Login", // Subject line
            text:`Your OTP for login is: ${OTP}`, // plain text body
          });

          const checkuser = await otpModel.findOne({email:email})

          if(checkuser){
              const updateOtp = await otpModel.updateOne({_id:checkuser.id},{$set:{
                  otp:OTP,
                  createdAt:new Date()
              }})
  
          }
          else{
  
              const saveotp = new otpModel({
                      email:existUser.email,
                      otp:OTP
              })
                saveotp.save()
          }
          
          return res.status(200).json({
              message:'OTP send successfully'
          })
       }
       
    //   console.log(code)
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
 

}

export const checkOtp = async(req,res)=>{
    try{
        const {email,otp}=req.body

        const checkotp = await otpModel.findOne({email:email , otp:otp})


        if(!checkotp){
            return res.status(400).json({
                message:"Invalid OTP or Email. Please check your information and try again."
            })
        }

        const currentTimestamp =new Date();
        const expiryTime = 2; 

        const checktimelimit = currentTimestamp - checkotp.createdAt < expiryTime * 60 * 1000
      
        // console.log(checktimelimit)

        if(checktimelimit){
            const checkUser =await userModel.findOne({email:email})
            if(checkUser){

                return res.status(200).json({
                    data:checkUser,
                    message:'Successfully '
                })
            }

        }
        else{
   
            const deletotp = await otpModel.deleteOne({_id:checkotp.id})

            return res.status(400).json({
                message:'session has expired'
            })
            
            
        }
        
        
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const changePassword = async(req,res)=>{
    try{
        {email,password}

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

