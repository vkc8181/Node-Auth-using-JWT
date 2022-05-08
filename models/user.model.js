const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username taken'],   //Not giving this error message (idk why)
        minlength: [3, 'Username too short'],
        required: [true, 'Username Required'],
        lowercase: true 
    },
    password: {
        type: String,
        required: [true, 'Password Required'],
        minlength: [6, 'Password too short']
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;