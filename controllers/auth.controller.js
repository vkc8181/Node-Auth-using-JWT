const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const maxAgeForJWTInSec = 3* 24 * 60 * 60;  //Equivalent to 3 days

function generateErrorObject(err) {
    const errorObj = {
        username: [],
        password: []
    }

    if(err.message.includes('duplicate key error collection')){
        errorObj.username.push('Username already taken');
    }
    if(err.message.includes('Username too short')){
        errorObj.username.push('Username too short');
    }
    if(err.message.includes('Username Required')){
        errorObj.username.push('Username Required');
    }

    if(err.message.includes('Password too short')){
        errorObj.password.push('Password too short');
    }
    if(err.message.includes('Password Required')){
        errorObj.password.push('Password Required');
    }

    return errorObj;

}

function createToken(id) {
    return jwt.sign({ id }, process.env.JWT_SIGN_KEY, {
        expiresIn: maxAgeForJWTInSec        
        //This means the validation can be done by this particular token for this much time only
    });
}

function handleSignupGet(req, res) {
    res.render('signup.ejs');
}

async function handleSignupPost(req, res) {

    const { username, password } = req.body;

    try{
        const user = await User.create({username, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAgeForJWTInSec * 1000
        })
        res.status(201).json(user);
    }
    catch(e) {
        res.status(400).json( generateErrorObject(e) );
        console.log(e.message);
    }

}


function handleLoginGet(req, res) {
    res.render('login.ejs');
}

function handleLoginPost(req, res) {
    console.log(req.body);
    res.send('login successful');
}

module.exports = {
    handleSignupGet,
    handleSignupPost,
    handleLoginGet,
    handleLoginPost
} 