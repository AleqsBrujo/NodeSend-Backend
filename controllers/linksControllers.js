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

export const getLink = async (req, res, next) => {

    const { url } = req.params

    //Verificar si existe enlace
    const link = await Links.findOne({ url })

    if(!link){
        res.status(404).json({msg: 'El enlace ingresado nó existe!'})
        return 
    }

    res.json({file: link.name})

    const {downloads, name} = link
    //Eliminar archivo si los downloads son 1
    if(downloads === 1){
        //Eliminar archivo
        console.log('Solo una descarga//')
        req.file = name
        
        //Eliminar entrada de la DB
        await Links.findOneAndDelete(req.params.url)
        next()

        
    } else {
        console.log('Aun quedan descargas.....')
        link.downloads --
        
    }

    

}


