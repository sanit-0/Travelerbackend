import  express  from "express";
import { addcategory, deletecategory, getcategories, getcategory, updatecategory,  } from "../controllers/recomCategory.controller";

const router = express.Router()

router.post('/addcategory',addcategory)

router.get('/getcategories',getcategories)

router.get('/getcategory/:category_id',getcategory)

router.put('/updatecategory/:category_id',updatecategory)

router.delete('/deletecategory/:category_id',deletecategory)

export default router