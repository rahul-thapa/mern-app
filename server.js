const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const items = require('./routes/api/items')
const path = require('path')

const app = express()



// Bodyparser middleware
app.use(bodyparser.json())

//DB Config

const db = require('./config/keys').mongoURI

// Connect to DB

mongoose
    .connect(db)
    .then(()=>console.log("DB Connected"))
    .catch(err=>console.log(err))


// Use routes
app.use('/api/items', items)

// Serve static files

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`Server started in port: ${port}`))




