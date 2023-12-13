import bcrypt from 'bcrypt'


const hashPass = (pass) => {
    
    const salt = bcrypt.genSaltSync(10)
    pass = bcrypt.hashSync( pass, salt)

    return pass
}

const comparePass = (pass) => {

    return pass
}

export {hashPass, comparePass}