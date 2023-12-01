import  express  from "express";
import { addRooms, getRooms, getroom, updateroom,deleteroom } from "../controllers/recomRooms.controller";

const router = express.Router()

router.post('/addrooms',addRooms)

router.get('/getrooms',getRooms)

router.get('/getroom/:room_id',getroom)

router.put('/updateroom/:room_id',updateroom)

router.delete('/deleteroom/:room_id',deleteroom)

export default router
