const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const uploadRouter = require('./routes/UploadRoute');
require('dotenv').config();

const PORT = process.env.PORT || 5000;


//some middleware to use
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

//connect mongo db
mongoose.connect(process.env.MONGO_URL)
.then( ()=> {
    console.log('Mongo db Connected successfully')
})
.catch(err => {
    console.log(err)
})

//connect server
app.get('/', (req, res) => {
    res.send('hello there server')
})

// routing system
app.use(uploadRouter)

//server listener
app.listen(PORT, () => {
console.log('Server is up and running')
})
