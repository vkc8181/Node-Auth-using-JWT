const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;