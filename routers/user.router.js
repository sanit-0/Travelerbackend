import express from "express";
import { checkOtp, deleteuser, getuser, getusers, login, removeuser, sendotp, signUp, updateUser } from "../controllers/user.controller";

const router  = express.Router()

router.post('/signup',signUp)

router.post('/login',login)

router.get('/getusers',getusers)

router.get('/getuser/:userID',getuser)

router.put('/updateuser/:userID',updateUser)

router.delete('/deleteuser/:userID',deleteuser)

router.delete('/removeuser/:userID',removeuser)

router.post('/sendotp',sendotp)

router.post('/checkOtp',checkOtp)


export default router