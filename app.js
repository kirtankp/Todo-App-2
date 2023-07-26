const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./Models/Users')
const port = 5001
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://kirtankp:PracticeCluster@cluster0.s29hirs.mongodb.net/')

const secretKey = "fbajs$0cg^&45$fhs"

const generateToken = (user) => {
    const payload = { username: user.username, password: user.password };
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

//routes
//signup
app.post('/user/signup', async (req, res) => {
    try {
        const user = req.body;
        if (await User.findOne(user)) {
            res.json({ message: 'already signed up' })
        } else {
            User(user).save()
            const token = generateToken(user);
            res.json({ msg: 'signup successfully', user, token })
        }
    } catch (error) {
        res.json({ message: 'error' })
    }
})
//login
app.post('/user/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({
        username: username,
        password: password
    });

    try {
        if (user) {
            const token = generateToken(user);
            res.json({ msg: 'logged in successfully', user, token })
        } else {
            res.json({ message: 'user authentication failed' })
        }
    } catch (error) {
        res.json({ message: 'error' })
    }

})
//fetch all todos
app.get('/user/todos', authenticateToken, (req, res) => {
    const authHeader = req.headers.authorization;

    //userId holds the user token
    const userId = authHeader.split(' ')[1];
    const todos = [];
    for (let i = 0; i < Todos.length; i++) {
        if (Todos[i].userId === userId) {
            todos.push(Todos[i])
        }
    }
    if (todos) {
        res.status(200).json(todos);
    } else {
        res.status(404).send('userId not found');
    }
})
//add todo
app.post('/user/todo', authenticateToken, (req, res) => {
    const authHeader = req.headers.authorization;

    //userId holds the user token
    const userId = authHeader.split(' ')[1];

    const { title, description, completed } = req.body;

    const newTodo = {
        userId,
        title,
        description,
        completed,
    };
    Todos.push(newTodo);
    res.status(201).json(newTodo);
})
//edit todo
app.put('/user/todo/:id', (req, res) => {

})
//delete todo
app.delete('/user/todo/:id', (req, res) => {

})

app.listen(port, () => {
    console.log('app is running on ' + port)
})