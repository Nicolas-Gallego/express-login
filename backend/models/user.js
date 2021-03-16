const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String,
    firstName: String,
    surname: String,
    birthday: Date,
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel