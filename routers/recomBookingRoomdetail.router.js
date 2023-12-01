import express from 'express'
import { addroombooking, deleteroombooking, getroombooking, getroombookings, removeroombooking } from '../controllers/recomBookingRoomdetail.controller'

const router = express.Router()

router.post('/addroombooking',addroombooking)
router.get('/getroombookings',getroombookings)
router.get('/getroombooking/:roombooking_id',getroombooking)
// router.get('/getroombooking/:roombooking_id',getroombooking)
router.delete('/deleteroombooking/:roombooking_id',deleteroombooking)
router.delete('/removeroombooking/:roombooking_id',removeroombooking)

export default router