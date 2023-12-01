import express from 'express'
import { addTofaq, getfaqs } from '../controllers/faq.controller'

const router = express.Router()

router.post('/addTofaq',addTofaq)
router.get('/getfaqs',getfaqs)

export default router