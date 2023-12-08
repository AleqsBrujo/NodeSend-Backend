import Users from '../models/UsersSchema.js'
import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import { generarJWT } from '../helpers/jwtGenerator.js'


const authUser = async(req, res) => {

    const errors = validationResult(req)
    const validationErrors = errors?.array()


    // Revizando si hay errores
    if(validationErrors.length > 0){
        return res.status(400).json({errors: validationErrors})
    }

    // Buscando el usuario para ver si esta registrado
    const {email, password} = req.body
    const user = await Users.findOne({email})
    
    if(!user){
        return res.status(401).json({msg: 'El Usuario no existe!'})
    }
    
    // Verificamos password y autenticamos usuario
    if(bcrypt.compareSync(password, user.password)){
        const token = generarJWT(user._id, user.name)

        res.json({token})
        
    } else {
       return res.status(401).json({msg: "La contraseñá es Incorrecta"})
    }


}

    
    
const activeUser = (req, res) => {
    
    res.status(200).json({
        user: req.user
    })        
    
}
    

export {authUser, activeUser}
    

