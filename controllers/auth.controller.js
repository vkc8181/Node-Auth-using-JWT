const User = require('../models/user.model');

function handleSignupGet(req, res) {
    res.render('signup.ejs');
}

async function handleSignupPost(req, res) {
    const { username, password } = req.body;

    try{
        const user = await User.create({username, password});
        res.status(201).json(user);
    }
    catch(e) {
        res.status(400).send('Someting went wrong');
        console.log(e);
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