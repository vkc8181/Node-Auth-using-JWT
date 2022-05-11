const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function reqAuth(req, res, next) {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SIGN_KEY, async (err, decodedToken)=> {
            if(err) {
                res.redirect('/login');
            }
            else{
                const user = await User.findById( decodedToken.id );
                res.locals.username = user.username;
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}




module.exports = {
    reqAuth
}
