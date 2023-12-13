import { mongoose } from "mongoose";

const LinksSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    origin_name: {
        type: String,
        required: true
    },
    downloads: {
        type: Number,
        default: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Users',
        default: null
    },
    password: {
        type: String,
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    }


})


export default mongoose.model('Links', LinksSchema)