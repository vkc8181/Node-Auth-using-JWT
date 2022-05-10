const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// DB HOOK - This is how they work
/*
//Gets fired before the document is saved
userSchema.pre('save', function(next) {
    console.log('Data about to be saved!!!');
    console.log(this);
    next();
});

//Gets fired after the document is saved
userSchema.post('save', function(doc, next) {   //doc is the saved object which is equivalant to "this" here
    console.log('Data saved sussessfully!!!');
    console.log(doc);
    next();
});
*/

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });

    if(!user) {
        throw Error('Incorrect username');
    }

    const auth = await bcrypt.compare(password, user.password);

    if(!auth) {
        throw Error('Incorrect password');
    }

    return user;
}


const User = mongoose.model('user', userSchema);

module.exports = User;