import express from 'express'
import { addbookingform, getbookingform, getbookingforms } from '../controllers/recomBookingform.controller'

const router = express.Router()

router.post('/addbookingform',addbookingform)
router.get('/getbookingforms',getbookingforms)
router.get('/getbookingform/:bookingform_id',getbookingform)

// router.get('/getroombooking/:roombooking_id',getroombooking)
// router.get('/getroombooking/:roombooking_id',getroombooking)
// router.delete('/deleteroombooking/:roombooking_id',deleteroombooking)
// router.delete('/removeroombooking/:roombooking_id',removeroombooking)
export default router