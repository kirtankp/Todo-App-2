const mongoose = require('mongoose')
//userSchema is the schema for the users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    //userData is the collection name in the dataBase
    { collection: 'userData' }
)
//User is the model name 
module.exports = mongoose.model('User', userSchema)