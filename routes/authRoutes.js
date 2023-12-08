import express from 'express'
import  { activeUser, authUser } from '../controllers/authController.js'
import { check } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'

const authRoutes = express.Router()

authRoutes.post('/',
    [   
        check('email', 'Formato de Email Incorrecto').isEmail(),
        check('password', 'El Password es Obligatorio').notEmpty()
    ], authUser)  

authRoutes.get('/',
    authMiddleware,
    activeUser)

export default authRoutes



