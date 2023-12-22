import express from 'express'
import {getLink, newLink} from '../controllers/linksControllers.js'
import { check } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'
import { deleteFile } from '../controllers/filesController.js'

const linksRoutes = express.Router()

linksRoutes.post('/',
    [
        check('name', 'Sube un archivo' ).notEmpty(),
        check('origin_name', 'Sube un archivo' ).notEmpty()
    ], authMiddleware, newLink )

linksRoutes.get('/:url', authMiddleware, getLink, deleteFile)    

export default linksRoutes;


