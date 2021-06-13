const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: [true, "can't be blank"], index: true },
    password: { type: String, required: [true, "can't be blank"]},
}, { timestamps: true })

const userModel = mongoose.model('user', userSchema)
module.exports = userModel