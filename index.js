import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import destinationrouter from './routers/topdestination.router'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productrouter from './routers/recomProduct.router'
import categoryrouter from './routers/recomCategory.router'
import facilityrouter from './routers/recomFacilities.router'
import highlightrouter from './routers/highlights.router'
import itineraryrouter from './routers/itinerary.router'
import faqrouter from './routers/faq.router'
import suitabilityrouter from './routers/suitability.router'

import roomsrouter from './routers/recomRooms.router'
import roombookingrouter from './routers/recomBookingRoomdetail.router'
import roombookingform from './routers/recomBookingform.router'
import userrouter from './routers/user.router'
import cartrouter from './routers/cart.router'
import pdfrouter from './routers/pdfGenerator.router'

const app = express()

app.use(express.json())

app.use(express.static(__dirname)) 

app.use(cors())

app.use(cookieParser())

const port= process.env.PORT


app.get('/',(req,res)=>{
    res.send('Server is runnimg...')
})

// mongoose.connect('mongodb://127.0.0.1:27017/traveler')
//     .then(()=>console.log('conected!'))
//     .catch(err => console.log(err))
   
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/traveler', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
})

app.use('/destination',destinationrouter)

app.use('/recomcategory',categoryrouter)

app.use('/recomproduct',productrouter)

app.use('/recomfacility',facilityrouter)

app.use('/highlight',highlightrouter)

app.use('/itinerary',itineraryrouter)

app.use('/faqs',faqrouter)
app.use('/suitability',suitabilityrouter)

app.use('/recomrooms',roomsrouter)

app.use('/roombooking',roombookingrouter)

app.use('/roombookingform',roombookingform)

app.use('/users',userrouter)

app.use('/cart',cartrouter)

app.use('/pdf',pdfrouter)


