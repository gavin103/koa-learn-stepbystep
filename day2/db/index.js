const mongoose = require('mongoose')

const uri = require('./config').MONGO_URI

mongoose.connect(uri)

mongoose.connection.on('connected', function() {
    console.log('Mongoose connection open to ' + uri);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose connection disconnected');
});

module.exports = mongoose