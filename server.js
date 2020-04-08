const express = require('express')
const mongoose = require('mongoose')
/// routes
const items = require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')


const path = require('path')
const config = require('config')
const app = express()



// Bodyparser middleware
app.use(express.json())

//DB Config

const db = config.get('mongoURI')

// Connect to DB

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("DB Connected"))
    .catch(err=>console.log(err))


// Use routes
app.use('/api/items', items)
app.use('/api/users', users)
app.use('/api/auth', auth)



// Serve static files

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
const server_host = process.env.YOUR_HOST || '0.0.0.0';
app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});
