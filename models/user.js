const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    password: String,
}, { timestamps: true })

const userobj = mongoose.model('userobj', userSchema)
module.exports = userobj