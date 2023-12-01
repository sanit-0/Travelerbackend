import express from 'express'
import { addToitinerary, getitineraries } from '../controllers/itinerary.controller'

const router = express.Router()

router.post('/addToitinerary',addToitinerary)
router.get('/getitineraries',getitineraries)

export default router