import express from 'express'
import dbConnection from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'


//Creando Servidor
const app = express()

console.log('Conectado correctamente al servidor')
dbConnection()

//Puerto de la app
const port = process.env.PORT || 4000

//Habilitando lectura de Body JSON
app.use(express.json())

 //Rutas de acceso
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

 app.use('/', (req, res) => {
    res.send('Hola Mundo')

 })

 app.listen(port, () => {
    console.log(`Servidor corriendo desde el puerto ${port}`)
 })

