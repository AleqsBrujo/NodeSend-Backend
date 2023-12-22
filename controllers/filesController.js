import multer from "multer"
import { nanoid } from "nanoid"
import fs from 'fs'


const uploadFile = async (req, res, next) => {

    //Configuracion de multer, carpeta de guardado y nombre de archivo
    const multerConfig = {
        limits : { fileSize : req.user? 1024 * 1024 * 10 : 1024 * 1024},
        storage: multer.diskStorage({
            destination: (req, file, cb) => {            
                cb(null, './uploads/')
            },
        filename: ( req, file, cb) => {
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
            cb(null, `${nanoid()}${extension}`)
           }    
        })
    }

    const upload = multer(multerConfig).single('file')

     
    upload(req, res, async (error) => {
        console.log(req.file)

        if(!error){
            res.json({ file: req.file.filename})
            return
        } else {
            console.log(error)
            return next()
        }

    })  
    
}  



const deleteFile = async (req, res ) => {
    console.log(req.file)

   try {
    fs.unlinkSync(`./uploads/${req.file}`)
    console.log('Archivo eliminado')
   } catch (error) {
        console.log(error)
   }
    
    return
}


export {uploadFile, deleteFile}

