const express = require('express')
const jwt = require('jsonwebtoken')
const port = 5001
const app = express();
app.use(express.json());

let Users = [];
let Todos = [];

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
app.post('/user/signup', (req, res) => {
    const user = req.body;
    const exists = Users.find(a => a.username === user.username);
    if (exists) {
        res.status(403).json({ message: 'User already exists' });
    } else {
        Users.push(user);
        const token = generateToken(user);
        res.json({ message: 'User created successfully', token });
    }
})
//login
app.post('/user/login', (req, res) => {
    const { username, password } = req.headers;
    const user = Users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken(user);
        res.json({ message: 'Logged in successfully', token });
    } else {
        res.status(403).json({ message: 'User authentication failed' });
    }
})
//fetch all todos
app.get('/user/todos', authenticateToken, (req, res) => {
    const authHeader = req.headers.authorization;

    //userId holds the user token
    const userId = authHeader.split(' ')[1];
    const todos = [];
    for (let i = 0; i < Todos.length; i++) {
        if(Todos[i].userId === userId) {
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