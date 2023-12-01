import  express  from "express";
import { addfacility, getfacilities,getfacility,updatefacility,deletefacility } from "../controllers/recomFacilities.controller";

const router = express.Router()

router.post('/addfacility',addfacility)

router.get('/getfacilities',getfacilities)

router.get('/getfacility/:facility_id',getfacility)

router.put('/updatefacility/:facility_id',updatefacility)

router.delete('/deletefacility/:facility_id',deletefacility)

export default router