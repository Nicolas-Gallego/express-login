const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const port = ('8000')

const app = express();

app.use(bodyParser.json());
app.listen(port, () => {
console.log('Server connected')
})
 mongoose.connect('mongodb://localhost:27017', ()=>{
     console.log('db connected')
 })