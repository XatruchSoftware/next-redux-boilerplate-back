const express = require('express')
const bodyParser = require('body-parser')

const port = 4000
let fakeTodoDB = []

let app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    next();
});

app.get('/ping', async (req, res) => {
    res.status(200).send({ message: "pong" })
})

app.get('/todos', async (req, res) => {
    res.status(200).send({ todos: fakeTodoDB })
})

app.post('/todos', async (req, res) => {
    const todo = req.body
    fakeTodoDB.push(todo)
    res.status(200).send({ todo })
})

app.delete('/todos/:title', async (req, res) => {
    const { title } = req.params
    const todo = fakeTodoDB.find((todo) => todo.title === title)
    fakeTodoDB.splice(fakeTodoDB.indexOf(todo) ,1)
    res.status(200).send({ todo })
})

app.listen(port, () => console.log(`> Listening on port: ${port}`))

