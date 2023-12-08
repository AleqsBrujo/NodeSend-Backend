import express from 'express'
import { newUser } from '../controllers/usersController.js'
import { check } from 'express-validator'


const router = express.Router()

router.post('/', 
    [
    check('name', 'El nombre es Obligatorio').notEmpty(),
    check('email', 'Formato de Email Invalido').isEmail(),
    check('age', 'Tu edad es obligatoria').isNumeric(),
    check('password', 'El Password debe tener al menos 6 caracteres').isLength({min: 6})

    ], newUser )



export default router

