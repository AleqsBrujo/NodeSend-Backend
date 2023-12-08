import { mongoose} from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('Se conecto correctamente a la DB')
    } catch (error) {
           console.log('Error al conectar a DB')
           console.log(error)
           process.exit(1) 
    }

}

export default dbConnection