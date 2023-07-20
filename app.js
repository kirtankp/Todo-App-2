const express = require('express')
const jwt = require('jsonwebtoken')
const port = 5001
const app = express();
app.use(express.json());

//routes
//signup
app.post('/user/signup',(req,res) => {

})
//login
app.post('/user/login',(req,res) => {

})
//fetch all todos
app.get('/user/todos',(req,res) => {

})
//add todo
app.post('/user/todo',(req,res) => {

})
//edit todo
app.put('/user/todo/:id',(req,res) => {

})
//delete todo
app.delete('/user/todo/:id',(req,res) => {

})

app.listen(() => {
    console.log('app is running on '+port)
},port)