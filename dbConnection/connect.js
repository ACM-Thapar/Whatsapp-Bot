const mongoose = require('mongoose');

function connect(url) {

    try {
        return mongoose.connect(url, {
            useNewUrlParser: "true",
            useUnifiedTopology: "true",

        })

    } catch (error) {
        return error.message;
    }
}

module.exports = connect