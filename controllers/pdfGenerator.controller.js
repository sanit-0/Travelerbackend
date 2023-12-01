import puppeteer from "puppeteer"
import nodemailer from 'nodemailer'
import multer from "multer"
import path from "path";
import fs, { mkdir } from 'fs'
import { storage } from "../util/fileUpload";
import pdfGeneratorModel from "../models/pdfGenerator.model"
import { PDFDocument } from "pdf-lib"

const upload = multer({storage:storage})

export const addpdf =async (req,res)=>{
    try{

        const {title,content,email} = req.body

        const savePdf = new pdfGeneratorModel({
            title:title,
            content:Buffer.from(content, 'base64'),
            email:email
        })

        savePdf.save()

        return res.status(201).json({
            message:'pdf added'
        })
    } 
    catch (error) {
       return res.status(500).json({
            message:error.message
        })
    }
}

export const senpdf = async (req,res)=>{
    try{

        const uploadPdfData = upload.single("pdf");

        uploadPdfData(req,res,async function(err){
            if(err){
                res.status(400).json({
                    message:err.message,
                })
            }
        try{

        const {email} = req.body

        // const pdfContent = fs.readFileSync('path-to-generated-pdf.pdf');
        // const pdfdata = await pdfGeneratorModel.findOne({email:email}) 
        // const pdfBytes = Buffer.from(pdfdata.content.buffer);
        // const pdfBytes = pdfdata.content.buffer;
        // const pdfBuffer = Buffer.from(pdfBytes);

        const pdfBuffer = req.file.buffer;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user:'sanittrycatch@gmail.com',
              pass: 'yhon yakz huts veyc'
    
            }
          });

          const info = await transporter.sendMail({
            from: 'sanittrycatch@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Your PDF Attachment',
            text: 'Please find the PDF attached below',
            attachments: [
                {
                    filename: 'your-booking.pdf',
                    content: pdfBuffer, // Use the PDF binary data here
                },
            ]
          })

          if(info){
              return res.status(200).json({
                    message:'Email send successfully '
              })        

          }

        }
        catch (error) {
            return res.status(500).json({
                 message:error.message
             })
         }
          
        });
    }  
    catch (error) {
        return res.status(500).json({
             message:error.message
         })
     }

}