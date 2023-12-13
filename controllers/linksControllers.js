import Links from '../models/LinksSchema.js'
import { nanoid } from 'nanoid'
import { hashPass } from '../helpers/hashPass.js'
import { validationResult } from "express-validator"


export const newLink = async(req, res, next) => {

    const {origin_name} = req.body
    
    const errors = validationResult(req)
    const validationErrors = errors?.array()
    

    // Revizando si hay errores
    if(validationErrors.length > 0){
        return res.status(400).json({errors: validationErrors})
    }

    //Creando el Objeto Links para guardar a DB
    const link = new Links()
    link.url = nanoid()
    link.name = nanoid()
    link.origin_name = origin_name   

    //Comprobando si el usuario esta registrado
    if(req.user){
        const {password, downloads} = req.body
        
        //Asignamos el numero de descargas permitidas
        if(downloads){
            link.downloads = downloads
        }
        //Aignamos password al link
        if(password){
            link.password = await hashPass(password)
        }

        //Asignamos el autor
        link.author = req.user.id
    }

    try {
        await link.save()
        return res.status(200).json({msg: `${link.url}`})
        
    } catch (error) {
      console.log(error)  
    }
      

}


