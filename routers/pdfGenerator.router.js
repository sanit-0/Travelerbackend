
import  express  from "express";
import { addpdf, senpdf } from "../controllers/pdfGenerator.controller";

const router = express.Router()

router.post('/addpdf',addpdf)

router.post('/sendpdf',senpdf)

export default router