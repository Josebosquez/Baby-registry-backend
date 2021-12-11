const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    fName: {
        type: String,
        trim: true,
        required: true,
    },
    lName: {
        type: String,
        trim: true,
    },
    sFName: {
        type: String,
        trim: true,
        required: true,
    },
    sLName: {
        type: String,
        trim: true,
    },
    babyGender: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('user', userSchema)