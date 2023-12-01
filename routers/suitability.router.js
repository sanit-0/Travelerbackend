import  express  from "express";
import { addsuitability, deletesuitability, getsuitabilities, getsuitability, updatesuitability } from "../controllers/suitability.controller";

const router = express.Router()

router.post('/addsuitability',addsuitability)

router.get('/getsuitabilities',getsuitabilities)

router.get('/getsuitability/:suitability_id',getsuitability)

router.put('/updatesuitability/:suitability_id',updatesuitability)

router.delete('/deletesuitability/:suitability_id',deletesuitability)

export default router