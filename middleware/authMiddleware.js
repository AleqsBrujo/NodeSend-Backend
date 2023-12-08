import jwt from 'jsonwebtoken'
import dotenv from 'dotenv' 

dotenv.config()

 const authMiddleware = (req, res, next) => {

    const authHeader = req.get('Authorization')

   
    if(authHeader){
        const token = authHeader.split(' ')[1]
        try {
            const user = jwt.verify(token, process.env.SECRET_KEY)
            
            req.user = user

        } catch (error) {
            res.status(401).json({msg: 'Token Invalido!'})
        }
        
    } 
    return next()

}

export default authMiddleware