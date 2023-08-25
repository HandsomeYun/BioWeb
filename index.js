const express = require("express")
const app = express()
const port = 8000
const cors = require("cors")

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

