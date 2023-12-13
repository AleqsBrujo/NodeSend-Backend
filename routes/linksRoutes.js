import express from 'express'
import {newLink} from '../controllers/linksControllers.js'
import { check } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'

const linksRoutes = express.Router()

linksRoutes.post('/',
    [
        check('name', 'Sube un archivo' ).notEmpty(),
        check('origin_name', 'Sube un archivo' ).notEmpty()
    ], authMiddleware, newLink )

export default linksRoutes;


