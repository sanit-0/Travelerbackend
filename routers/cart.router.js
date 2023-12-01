import express from 'express'
import { addToCart, deleteCartitem, getCartData, removeCartItem, updateQuantity } from '../controllers/cart.controller'
import auth from '../middelwares/auth.middelware'
const router = express.Router()

router.post('/addToCart',addToCart)

router.get('/getCartData',getCartData)

router.delete('/deleteCartitem/:cartid',deleteCartitem) 

router.delete('/removeCartItem/:cartid',removeCartItem)

export default router;