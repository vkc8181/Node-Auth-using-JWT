const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

const maxAgeForJWTInSec = 3* 24 * 60 * 60;  //Equivalent to 3 days

function generateErrorObject(err) {
    const errorObj = {
        username: '',
        password: ''
    }

    //Errors from signup
    if(err.message.includes('duplicate key error collection')){
        errorObj.username = 'Username already taken';
    }
    if(err.message.includes('Username too short')){
        errorObj.username = 'Username too short';
    }
    if(err.message.includes('Username Required')){
        errorObj.username = 'Username Required';
    }

    if(err.message.includes('Password too short')){
        errorObj.password = 'Password too short';
    }
    if(err.message.includes('Password Required')){
        errorObj.password = 'Password Required';
    }


    //Errors from Login
    if(err.message.includes('Incorrect username')) {
        errorObj.username = 'Incorrect username';
    }
    if(err.message.includes('Incorrect password')) {
        errorObj.password = 'Incorrect password';
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
        res.status(201).json({ user: user._id });
    }
    catch(e) {
        res.status(400).json( generateErrorObject(e) );
        console.log(e.message);
    }

}


function handleLoginGet(req, res) {
    res.render('login.ejs');
}

async function handleLoginPost(req, res) {
    const {username, password } = req.body;
    try{
        const user = await User.login(username, password);
        res.status(200).json({ user:user._id });
    }
    catch(err) {
        const errorObj = generateErrorObject(err);
        res.status(400).json(errorObj);
    }
}

module.exports = {
    handleSignupGet,
    handleSignupPost,
    handleLoginGet,
    handleLoginPost
} 