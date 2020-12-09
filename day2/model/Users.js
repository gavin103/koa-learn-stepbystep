const mongoose = require('../db')
const { USERS_COLLECTION } = require('../db/config')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = model(USERS_COLLECTION, UserSchema)