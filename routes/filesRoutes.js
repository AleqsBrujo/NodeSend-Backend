import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { deleteFile, uploadFile } from '../controllers/filesController.js'


const filesRoutes = express.Router()

filesRoutes.post('/', authMiddleware, uploadFile )



export default filesRoutes