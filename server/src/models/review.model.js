import mongoose,{Schema} from 'mongoose'
import modelOptions from './models.options.js'

export default mongoose.model(
    "Review",
    mongoose.Schema({
        user:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        mediaType:{
            type:Number,
            required:true
        },
        mediaId:{
            type:String,
            required:true
        },
        mediaTitle:{
            type:String,
            required:true
        },
        mediaPoster:{
            type:String,
            required:true
        }
    }),modelOptions
)