const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    phoneNo: {
        type: String,
        required: true
    }

})

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel