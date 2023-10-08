const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./Models/Users')
const Todo = require('./Models/Todos')
const port = 5001
const app = express();
const cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)

const secretKey = process.env.SECRET

const generateToken = (user) => {
    const payload = { email: user.email, password: user.password };
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
    try {
        const user = req.body;
        if (await User.findOne(user)) {
            const token = generateToken(user);
            res.json({ msg: 'logged in successfully', user, token })
        } else {
            res.json({ message: 'user authentication failed', user })
        }
    } catch (error) {
        res.json({ message: 'error' })
    }
})
//fetch all todos
app.get('/user/todos', authenticateToken, async (req, res) => {
    const userId = req.user.username;

    try {
        const todos = await Todo.find({ userId });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos', error });
    }
})
//add todo
app.post('/user/todo', authenticateToken, async (req, res) => {
    const userId = req.user.username;

    try {
        const { title, description } = req.body;
        const todoId = Math.floor(Math.random() * 1000000) // unique random id
        const newTodo = new Todo({
            userId,
            todoId,
            title,
            description
        });
        await newTodo.save();
        res.status(201).json({ msg: 'Todo Added', newTodo });
    } catch (error) {
        res.status(500).json({ message: 'Error adding todo', error });
    }
})
//edit todo
app.put('/user/todo/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const { title, description } = req.body;

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // This option returns the updated todo after the update is applied
        );

        if (updatedTodo) {
            res.json({ msg: 'Todo updated successfully', updatedTodo });
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating todo', error });
    }
})
//delete todo
app.delete('/user/todo/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            res.json({ msg: 'Todo deleted successfully', deletedTodo });
        } else {
            res.status(404).send('Todo not found');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting todo', error });
    }
})

app.listen(port, () => {
    console.log('app is running on ' + port)
})