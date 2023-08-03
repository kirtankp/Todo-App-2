const mongoose = require('mongoose')
//todoSchema is the schema for the users
const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    todoId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    //userTodo is the collection name in the dataBase
    { collection: 'userTodo' }
)
//Todo is the model name 
module.exports = mongoose.model('Todo', todoSchema)