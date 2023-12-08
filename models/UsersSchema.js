import {mongoose} from "mongoose";


const usersSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,        
    },    
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    }
})

export default mongoose.model('Users', usersSchema)