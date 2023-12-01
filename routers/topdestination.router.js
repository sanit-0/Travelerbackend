import  express  from "express";
import { adddestination, getdestinations } from "../controllers/topdestination.controller";

const router = express.Router()

router.post('/adddestination',adddestination)
router.get('/getdestinations',getdestinations)

export default router 