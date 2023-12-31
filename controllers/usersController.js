import Users from '../models/UsersSchema.js'
import { validationResult } from 'express-validator'
import { hashPass } from '../helpers/hashPass.js'


const newUser = async(req, res) => {    

    //Mostrar mensajes de error express validator
    const errors = validationResult(req)
    const validationErrors = errors?.array()

    if(validationErrors.length > 0){
        return res.status(400).json({errors: validationErrors})
    }
    
    const {email, password} = req.body    

    try {
        const user = await Users.findOne({email})

        if( user ){
            return res.status(400).json({msg: "El usuario ya esta registrado"})
        }
        
        const newUser = await new Users(req.body)

        //Encriptando pass        
        newUser.password = await hashPass( password )

        await newUser.save()
        
       return  res.status(200).json({
            msg: "Usuario creado con exito!"
        })
        
    } catch (error) {
        
        return res.status(400).json({msg: "Hubo un error"})
    }   


}


export {newUser}