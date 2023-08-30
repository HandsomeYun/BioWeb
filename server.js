const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const express = require("express")
const app = express()
const port = process.env.PORT || 3000;
const cors = require("cors")

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//create  an example rout
app.get("/", cors(), async(req, res) => {
    res.send("this is working")
})

console.log(process.env);

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser:true
}).then((conn) => {
    //console.log(conn);
    console.log('DB Connection Successful')
}).catch((error) => {
    console.log('Error Occured')
})

app.listen(port, ()=>{
    console.log('listening at http://localhost:${port}')
})

