import  express  from "express";
import { addproduct, deletproduct, getproduct, getproducts, removeproduct, updateproducts } from "../controllers/recomProduct.controller";

const router = express.Router()

router.post('/addproduct',addproduct)

router.get('/getproducts',getproducts)

router.get('/getproduct/:product_id',getproduct)

router.put('/updateproduct/:product_id',updateproducts)

router.delete('/deleteproduct/:product_ID',deletproduct)

router.delete('/removeproduct/:product_ID',removeproduct)

export default router