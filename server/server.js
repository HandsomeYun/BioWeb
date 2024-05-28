const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const express = require("express")
const app = express()
const port = process.env.PORT || 8000;
const cors = require("cors")
const Router = require('./routes/route.js');


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//routes
app.use('/api', Router);

console.log(process.env);

mongoose.connect(process.env.CONN_STR, {
    dbName: 'ligandData',
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then((conn) => {
    console.log(conn);
    console.log('DB Connection Successful')
}).catch((err) => {
    console.log(err);
})

app.listen(port, ()=>{
    console.log('listening at http://localhost:${port}')
})

