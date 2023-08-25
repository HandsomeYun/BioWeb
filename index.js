const express = require("express")
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const connectionString = process.env.DB_STRING
const port = 8000
const cors = require("cors")

MongoClient.connect(connectionString)
.then(client => {
    console.log('Connected to database')
    const db = client.db('to-do-app')
    const taskCollection = db.collection('tasks')

    //CRUD request
})
.catch(error => console.error(error))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//create  an example rout
app.get("/", cors(), async(req, res) => {
    res.send("this is working")
})


app.listen(port, ()=>{
    console.log('listening at http://localhost:${port}')
})

