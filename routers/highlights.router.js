import express from 'express'
import { addTohighlight, gethighlights, } from '../controllers/highlights.controller'

const router = express.Router()

router.post('/addhighlight',addTohighlight)
router.get('/gethighlights',gethighlights)

export default router