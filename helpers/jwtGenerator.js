import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

const generarJWT = (id, name) => {
   return jwt.sign({
        id: id,
        name: name
    }, process.env.SECRET_KEY, {
        expiresIn: '8h'
    })

}

export {generarJWT}